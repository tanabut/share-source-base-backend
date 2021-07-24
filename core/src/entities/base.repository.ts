/* eslint-disable @typescript-eslint/no-unused-vars */
import chunk from 'lodash/chunk';
import {
  EntityRepository,
  EntityManager,
  BaseEntity,
  ObjectLiteral,
} from 'typeorm';

import { uniqueMap } from '../utils/array';
import { generateConflictSetValueString } from '../utils/sql';

type RelatedEntityHandlerAttributes<T> = Partial<T> & {
  id: string | number;
  __state?: string;
};

@EntityRepository()
export class BaseRepository {
  constructor(public manager: EntityManager) {
    this.manager = manager;
  }

  async saveOrUpdateRelated(
    Entity: typeof BaseEntity,
    attrs: RelatedEntityHandlerAttributes<BaseEntity>[] = [],
  ) {
    const newEntities = attrs
      .filter(entity => entity.__state === 'new')
      .map(({ __state, id, ...entityAttr }) => entityAttr);
    const editedEntities = attrs
      .filter(entity => entity.__state === 'edited')
      .map(({ __state, ...entityAttr }) => entityAttr);

    if (newEntities.length) {
      await this.manager.insert(Entity, newEntities);
    }

    if (editedEntities.length) {
      await Promise.all(
        editedEntities.map(entity =>
          this.manager.update(Entity, { id: entity.id }, entity),
        ),
      );
    }
  }

  // TODO : Make parameters more semantic and easier to manage
  async _upsert<T>(
    Entity: typeof BaseEntity | string,
    attrs: T[],
    {
      onConflictUniqueFields,
      excludeOnConflictSetFields = onConflictUniqueFields,
      extraOnConflictSetFields = [],
      onConflictSetFields: _onConflictSetFields,
      uniqueIdentifierCombination,
    }: {
      onConflictUniqueFields: string[];
      excludeOnConflictSetFields?: string[];
      extraOnConflictSetFields?: string[];
      onConflictSetFields?: string[];
      uniqueIdentifierCombination?: string[];
    },
  ) {
    if (!attrs.length) {
      return [];
    }

    const onConflictSetFields = (
      _onConflictSetFields ||
      Object.keys(attrs[0] as T).filter(
        field => ![...excludeOnConflictSetFields, 'id'].includes(field),
      )
    ).concat(extraOnConflictSetFields);
    const onConflictSetQueryString = generateConflictSetValueString(
      onConflictSetFields,
    );

    const dedupAttrs = uniqueMap(
      attrs,
      uniqueIdentifierCombination || onConflictUniqueFields,
    );

    const chunkedAttrs = chunk(dedupAttrs, 1000);

    let identifiers: ObjectLiteral[] = [];

    const onConflictFieldQuery = onConflictUniqueFields.reduce((acc, f, i) => {
      return `${acc}"${f}" ${i < onConflictUniqueFields.length - 1 ? ',' : ''}`;
    }, '');
    const onConflictDoQuery = `DO ${
      onConflictSetQueryString && onConflictSetQueryString.length
        ? `UPDATE SET ${onConflictSetQueryString}`
        : 'NOTHING'
    }`;

    await chunkedAttrs.reduce(async (cPromise, cAttrs) => {
      await cPromise;

      const query = this.manager
        .createQueryBuilder()
        .insert()
        .into(Entity)
        .values(
          cAttrs.map((attr: any) => {
            attr.updatedAt = new Date();
            return attr as T;
          }),
        )
        .onConflict(`( ${onConflictFieldQuery} ) ${onConflictDoQuery}`);

      const res = await query.execute();

      identifiers = identifiers.concat(res.identifiers);
    }, Promise.resolve());

    return identifiers;
  }
}
