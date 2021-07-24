import chunk from 'lodash/chunk';

export function chunkedRequest<T, R>(
  collection: T[],
  chunkSize = 10,
  requestFn: (entity: T) => Promise<R>,
  onChunkSuccess?: (chunkResponses: { row: T; response: R }[]) => Promise<void>,
) {
  const chunkedCollection = chunk(collection, chunkSize);

  return new Promise<void>((resolve, reject) => {
    let index = 0;
    let isFetching = false;

    const iRef = setInterval(() => {
      if (isFetching) {
        return;
      }

      if (index >= chunkedCollection.length) {
        clearInterval(iRef);
        resolve();
        return;
      }

      const currentChunk = chunkedCollection[index] || [];

      Promise.all(currentChunk.map(requestFn))
        .then(async responses => {
          if (onChunkSuccess) {
            await onChunkSuccess(
              currentChunk.map((c, i) => ({
                row: c,
                response: responses[i] as R,
              })),
            );
          }

          index += 1;
          isFetching = false;
        })
        .catch(e => {
          clearInterval(iRef);
          reject(e);
        });
      isFetching = true;
    }, 10);
  });
}

export function withRetry<P, R>(
  fn: (params: P) => Promise<R>,
): (params: P, retryCountLeft?: number) => Promise<R> {
  const fnWithRetry: (
    params: P,
    retryCountLeft?: number,
  ) => Promise<R> = async (params: P, retryCountLeft = 3) => {
    try {
      const res = await fn(params);

      return res;
    } catch (err) {
      retryCountLeft -= 1;
      if (retryCountLeft <= 0) {
        throw err;
      }
      const res = await fnWithRetry(params, retryCountLeft);
      return res;
    }
  };

  return fnWithRetry;
}
