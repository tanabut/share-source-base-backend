import { Repository, SelectQueryBuilder } from 'typeorm';
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
    modifyQueryBuilder?: (qb: SelectQueryBuilder<Repository<CommonEntity>>) => void;
}
export declare function queryEntities({ Entity, q, limit, page, orderBy, orderDirection, parentId, parentEntityKey, parentEntityName, searchColumns, relations, modifyQueryBuilder, }: QueryEntityProps): Promise<{
    entities: CommonEntity[];
    count: number;
}>;
export declare function getEntityBy(Entity: any, filters: {
    [key: string]: any;
}, relations: string[]): Promise<any>;
export declare function getEntityColumns(entityName: string): Promise<{
    name: string;
    type: string | number | boolean;
}[]>;
export declare function cleanEntityCollection(entity: string, collection: any[], customColumns?: {
    type?: string;
    name: string;
}[]): Promise<any[]>;
//# sourceMappingURL=entity.service.d.ts.map