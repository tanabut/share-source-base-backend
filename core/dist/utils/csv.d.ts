import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export declare function csvToJson<T, K>(filePath: string): Promise<QueryDeepPartialEntity<T>[]>;
export declare function getCSVData<T, K>(fileName: string, convert: (raw: K) => QueryDeepPartialEntity<T>, keys: string[]): Promise<QueryDeepPartialEntity<T>[]>;
export declare function chunkedReadCSVFile<T>(fileName: string, csvHeaders: string[], chunkBufferSize: number, handler: (rc: {
    index: number;
    row: T[];
}[]) => Promise<void>): Promise<void>;
//# sourceMappingURL=csv.d.ts.map