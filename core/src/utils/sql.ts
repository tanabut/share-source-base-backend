import {
  BaseEntity,
  EntityManager,
  EntityTarget,
  getConnection,
  Repository,
} from 'typeorm';

export function generateConflictSetValueString(attrs: string[]) {
  return attrs.reduce((setQuery, curr, index) => {
    let newSetQuery = setQuery;
    newSetQuery += `"${curr}" = excluded."${curr}"`;
    if (index !== attrs.length - 1) {
      newSetQuery += ', ';
    }
    return newSetQuery;
  }, '');
}

export function createRunInTransactionHelper<T extends BaseEntity>(
  entity: EntityTarget<T>,
  initFn: (tManager: EntityManager, repo: Repository<T>) => Promise<void>,
) {
  return (fn: (repo: Repository<T>) => Promise<void>) => {
    return getConnection().manager.transaction(async (tManager) => {
      const repo = tManager.getRepository<T>(entity);

      await initFn(tManager, repo);
      await fn(repo);

      tManager.queryRunner?.rollbackTransaction();
    });
  };
}
