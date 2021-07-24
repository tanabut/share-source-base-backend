import chunk from 'lodash/chunk';
import { EntityRepository, BaseEntity, In } from 'typeorm';

import { BaseRepository } from './base.repository';

@EntityRepository()
class GenericRepository extends BaseRepository {
  async getEntityMapByIds<V extends BaseEntity, E extends typeof BaseEntity>(
    Entity: E,
    ids: (string | number)[],
    key: string,
  ): Promise<{ [key: string]: V }> {
    const entityMap: { [key: string]: V } = {};

    const chunkedIds = chunk(ids, 1000);

    await chunkedIds.reduce(async (cPromise, cIds) => {
      await cPromise;

      const records = await this.manager.find(Entity, {
        where: {
          [key]: In(cIds),
        },
      });

      records.reduce((acc: { [key: string]: V }, curr) => {
        const id = curr[key as keyof BaseEntity] as any;
        if (!id) {
          return acc;
        }

        acc[id] = curr as V;

        return acc;
      }, entityMap);
    }, Promise.resolve());

    return entityMap;
  }
}

export { GenericRepository as default };
