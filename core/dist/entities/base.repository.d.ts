import { EntityManager, BaseEntity, ObjectLiteral } from 'typeorm';
declare type RelatedEntityHandlerAttributes<T> = Partial<T> & {
    id: string | number;
    __state?: string;
};
export declare class BaseRepository {
    manager: EntityManager;
    constructor(manager: EntityManager);
    saveOrUpdateRelated(Entity: typeof BaseEntity, attrs?: RelatedEntityHandlerAttributes<BaseEntity>[]): Promise<void>;
    _upsert<T>(Entity: typeof BaseEntity | string, attrs: T[], { onConflictUniqueFields, excludeOnConflictSetFields, extraOnConflictSetFields, onConflictSetFields: _onConflictSetFields, uniqueIdentifierCombination, }: {
        onConflictUniqueFields: string[];
        excludeOnConflictSetFields?: string[];
        extraOnConflictSetFields?: string[];
        onConflictSetFields?: string[];
        uniqueIdentifierCombination?: string[];
    }): Promise<ObjectLiteral[]>;
}
export {};
//# sourceMappingURL=base.repository.d.ts.map