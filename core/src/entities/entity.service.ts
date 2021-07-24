import { Repository, Brackets, SelectQueryBuilder } from 'typeorm';

import { getConnection } from '../db';
import { parseDate } from '../utils/xlsx';

import { CommonEntity } from './common.entity';

export interface WhereCondition {
  entityName: string;
  entityKey: string;
  value: unknown;
}

export interface QueryEntityProps {
  Entity: Repository<CommonEntity>;
  q?: string;
  entityName: string;
  limit: number;
  page?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  parentId?: number;
  parentEntityName?: string;
  parentEntityKey?: string;

  searchColumns: string[];
  relations?: string[];
  modifyQueryBuilder?: (
    qb: SelectQueryBuilder<Repository<CommonEntity>>,
  ) => void;
}

function getDBFieldName({
  Entity,
  field,
  useQuotes = true,
  relations = [],
}: {
  Entity: Repository<CommonEntity>;
  field: string;
  useQuotes?: boolean;
  relations?: string[];
}) {
  const fCol = field.split('.');
  const isRelatedField =
    fCol.length > 1 && fCol[0] && relations.includes(fCol[0]);

  const fieldName = `"${Entity.metadata.targetName}${
    !isRelatedField ? `"."${fCol[0]}"` : `__${fCol[0]}"."${fCol[1]}"`
  }`;

  if (useQuotes) {
    return fieldName;
  }

  return fieldName.replace(/"/g, '');
}

export async function queryEntities({
  Entity,
  q,
  limit,
  page = 1,
  orderBy,
  orderDirection,
  parentId,
  parentEntityKey = 'id',
  parentEntityName,
  searchColumns = [],
  relations = [],
  modifyQueryBuilder,
}: QueryEntityProps) {
  const offset = limit * (page - 1);

  const [entities, count] = await Entity.findAndCount({
    where: (qb: SelectQueryBuilder<typeof Entity>) => {
      if (parentId && parentEntityName) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        qb.andWhere({
          [parentEntityName]: {
            [parentEntityKey]: parentId,
          },
        });
      }

      if (modifyQueryBuilder) {
        modifyQueryBuilder(qb);
      }

      if (q) {
        qb.andWhere(
          new Brackets((sqb: any) => {
            searchColumns.forEach(searchField => {
              const iLikeCol = getDBFieldName({
                Entity,
                field: searchField,
                relations,
              });
              sqb.orWhere(`${iLikeCol} ILIKE :q`, {
                q: `%${q?.toLowerCase()}%`,
              });
            });
          }),
        );
      }

      if (orderBy) {
        const x = getDBFieldName({
          Entity,
          field: orderBy,
          useQuotes: false,
          relations,
        });
        qb.orderBy(x, orderDirection);
      }
    },
    relations,
    skip: offset,
    take: limit,
  });

  return { entities, count };
}

export async function getEntityBy(
  Entity: any,
  filters: { [key: string]: any },
  relations: string[],
) {
  const entity = await Entity.findOne({
    where: (qb: any) => {
      Object.keys(filters).forEach((field, fieldIndex) => {
        const filterVal = filters[field];

        qb.andWhere(
          `${getDBFieldName({
            Entity,
            field,
            relations,
          })} = :${fieldIndex}`,
          {
            [fieldIndex]: filterVal,
          },
        );
      });
    },
    relations,
  });

  return entity;
}

export async function getEntityColumns(entityName: string) {
  const db = getConnection();

  const rawEntityMetaData = db.entityMetadatas.find(
    e => e.tableName === entityName,
  );

  if (!rawEntityMetaData) {
    throw new Error(`Invalid entity ${entityName}`);
  }

  return rawEntityMetaData.columns.map(column => {
    const rawType = column.type;
    const type = typeof rawType === 'function' ? rawType() : rawType;

    return {
      name: column.databaseName,
      type,
    };
  });
}

export async function cleanEntityCollection(
  entity: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collection: any[],
  customColumns: { type?: string; name: string }[] = [],
) {
  const entityColumns = (await getEntityColumns(entity)) || [];

  const columns = [...entityColumns, ...customColumns];

  return collection.map(row => {
    return columns.reduce((acc, col) => {
      const colType = col.type;
      const colName = col.name;
      const val = row[colName];

      const newAcc = { ...acc };

      if (colType === 0) {
        newAcc[colName] = val && parseInt(val, 10);

        return newAcc;
      }

      if (colType === 'float') {
        newAcc[colName] = val ? parseFloat(val) : undefined;

        return newAcc;
      }

      if (colType === 'int') {
        newAcc[colName] = val ? parseInt(val, 10) : undefined;

        return newAcc;
      }

      if (colType === 'boolean') {
        newAcc[colName] = typeof val !== 'undefined' ? Boolean(val) : undefined;

        return newAcc;
      }

      if (colType === 'timestamptz') {
        newAcc[colName] = val ? parseDate(val) : undefined;

        return newAcc;
      }

      newAcc[colName] = val;

      return newAcc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);
  });
}
