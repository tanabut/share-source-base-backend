import { BaseEntity, EntityManager, EntityTarget, Repository } from 'typeorm';
export declare function generateConflictSetValueString(attrs: string[]): string;
export declare function createRunInTransactionHelper<T extends BaseEntity>(entity: EntityTarget<T>, initFn: (tManager: EntityManager, repo: Repository<T>) => Promise<void>): (fn: (repo: Repository<T>) => Promise<void>) => Promise<void>;
//# sourceMappingURL=sql.d.ts.map