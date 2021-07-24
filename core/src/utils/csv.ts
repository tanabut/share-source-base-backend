/* eslint-disable no-await-in-loop */
import fs from 'fs';
import path from 'path';

import * as csv from 'fast-csv';
import get from 'lodash/get';
import reduce from 'lodash/reduce';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export async function csvToJson<T, K>(filePath: string) {
  return new Promise<QueryDeepPartialEntity<T>[]>((resolve, reject) => {
    const rows: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', (raw: K) => {
        rows.push(raw);
      })
      .on('end', () => resolve(Object.values(rows)));
  });
}

// TODO: Handle duplicated function
export async function getCSVData<T, K>(
  fileName: string,
  convert: (raw: K) => QueryDeepPartialEntity<T>,
  keys: string[],
) {
  return new Promise<QueryDeepPartialEntity<T>[]>((resolve, reject) => {
    const data: { [key: string]: QueryDeepPartialEntity<T> } = {};

    fs.createReadStream(path.resolve(__dirname, `../../temp/${fileName}.csv`))
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', (raw: K) => {
        const value = convert(raw);
        const uniqueKey: string = reduce(
          keys,
          (acc, key) => `${acc}:${get(value, key)}`,
          '',
        );

        data[uniqueKey] = value;
      })
      .on('end', () => resolve(Object.values(data)));
  });
}

async function parseChunkBuffer<T>(
  fileHandler: fs.promises.FileHandle,
  csvHeaders: string[],
  fromByteIndex: number,
  chunkBufferSize: number,
  lastRowIndex: number,
) {
  let buffer = Buffer.alloc(chunkBufferSize);
  let res = await fileHandler.read(buffer, 0, chunkBufferSize, fromByteIndex);
  if (!res.bytesRead)
    return {
      toByteIndex: 0,
      data: null,
      lastRowIndex,
    };

  let read = 0;
  while (res.bytesRead !== -1 && res.bytesRead) {
    res = await fileHandler.read(buffer, read);
    read += res.bytesRead;
  }
  const lastLine = buffer.lastIndexOf('\n');
  buffer = buffer.slice(0, lastLine + 1);
  const data = buffer.toString();

  let _lastRowIndex = lastRowIndex;
  const _data: { index: number; row: T[] }[] = await new Promise(
    (resolve, reject) => {
      const _rows: { index: number; row: T[] }[] = [];

      csv
        .parseString(data, {
          headers: csvHeaders,
        })
        .on('error', error => reject(error))
        .on('data', row => {
          _lastRowIndex += 1;
          _rows.push({
            index: _lastRowIndex,
            row,
          });
        })
        .on('end', () => resolve(_rows));
    },
  );

  return {
    toByteIndex: fromByteIndex + lastLine,
    data: _data,
    lastRowIndex: _lastRowIndex,
  };
}

export async function chunkedReadCSVFile<T>(
  fileName: string,
  csvHeaders: string[],
  chunkBufferSize: number,
  handler: (rc: { index: number; row: T[] }[]) => Promise<void>,
) {
  const fileHandler = await fs.promises.open(fileName, 'r');
  let chunkIndex = 0;
  let fromByteIndex = 0;
  let chunkBuffer = null;
  let lastRowIndex = 0;
  do {
    chunkBuffer = await parseChunkBuffer<T>(
      fileHandler,
      csvHeaders,
      fromByteIndex,
      chunkBufferSize,
      lastRowIndex,
    );
    fromByteIndex = chunkBuffer.toByteIndex + 1;

    if (chunkBuffer.data && chunkIndex > 0) {
      await handler(chunkBuffer.data);
    }

    chunkIndex += 1;
    lastRowIndex = chunkBuffer.lastRowIndex;
  } while (chunkBuffer.data);

  await fileHandler.close();
}
