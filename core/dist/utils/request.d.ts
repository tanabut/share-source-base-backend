export declare function chunkedRequest<T, R>(collection: T[], chunkSize: number | undefined, requestFn: (entity: T) => Promise<R>, onChunkSuccess?: (chunkResponses: {
    row: T;
    response: R;
}[]) => Promise<void>): Promise<void>;
export declare function withRetry<P, R>(fn: (params: P) => Promise<R>): (params: P, retryCountLeft?: number) => Promise<R>;
//# sourceMappingURL=request.d.ts.map