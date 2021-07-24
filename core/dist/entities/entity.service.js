"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanEntityCollection = exports.getEntityColumns = exports.getEntityBy = exports.queryEntities = void 0;
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const xlsx_1 = require("../utils/xlsx");
function getDBFieldName({ Entity, field, useQuotes = true, relations = [], }) {
    const fCol = field.split('.');
    const isRelatedField = fCol.length > 1 && fCol[0] && relations.includes(fCol[0]);
    const fieldName = `"${Entity.metadata.targetName}${!isRelatedField ? `"."${fCol[0]}"` : `__${fCol[0]}"."${fCol[1]}"`}`;
    if (useQuotes) {
        return fieldName;
    }
    return fieldName.replace(/"/g, '');
}
async function queryEntities({ Entity, q, limit, page = 1, orderBy, orderDirection, parentId, parentEntityKey = 'id', parentEntityName, searchColumns = [], relations = [], modifyQueryBuilder, }) {
    const offset = limit * (page - 1);
    const [entities, count] = await Entity.findAndCount({
        where: (qb) => {
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
                qb.andWhere(new typeorm_1.Brackets((sqb) => {
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
                }));
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
exports.queryEntities = queryEntities;
async function getEntityBy(Entity, filters, relations) {
    const entity = await Entity.findOne({
        where: (qb) => {
            Object.keys(filters).forEach((field, fieldIndex) => {
                const filterVal = filters[field];
                qb.andWhere(`${getDBFieldName({
                    Entity,
                    field,
                    relations,
                })} = :${fieldIndex}`, {
                    [fieldIndex]: filterVal,
                });
            });
        },
        relations,
    });
    return entity;
}
exports.getEntityBy = getEntityBy;
async function getEntityColumns(entityName) {
    const db = db_1.getConnection();
    const rawEntityMetaData = db.entityMetadatas.find(e => e.tableName === entityName);
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
exports.getEntityColumns = getEntityColumns;
async function cleanEntityCollection(entity, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
collection, customColumns = []) {
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
                newAcc[colName] = val ? xlsx_1.parseDate(val) : undefined;
                return newAcc;
            }
            newAcc[colName] = val;
            return newAcc;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {});
    });
}
exports.cleanEntityCollection = cleanEntityCollection;
//# sourceMappingURL=entity.service.js.map