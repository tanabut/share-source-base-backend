import 'reflect-metadata';
import { ConnectionOptions, getConnection as _getConnection } from 'typeorm';
export declare const dbConfig: ConnectionOptions;
export declare function initDb(customConfig?: ConnectionOptions): Promise<import("typeorm").Connection>;
export declare const getConnection: typeof _getConnection;
export declare const getManager: () => Promise<import("typeorm").EntityManager>;
//# sourceMappingURL=db.d.ts.map