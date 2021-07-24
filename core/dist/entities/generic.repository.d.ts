import { BaseEntity } from 'typeorm';
import { BaseRepository } from './base.repository';
declare class GenericRepository extends BaseRepository {
    getEntityMapByIds<V extends BaseEntity, E extends typeof BaseEntity>(Entity: E, ids: (string | number)[], key: string): Promise<{
        [key: string]: V;
    }>;
}
export { GenericRepository as default };
//# sourceMappingURL=generic.repository.d.ts.map