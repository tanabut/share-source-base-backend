import { Entity, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';

import { CmsApiCLS } from '../cls';

import { cmsCreatedBy, cmsUpdatedBy } from './entity.event-helpers';

import { CommonEntity, CommonEntityAttributes } from './common.entity';
import { UserAttributes } from '../user/user.types';

export interface BaseEntityAttributes<
  T extends UserAttributes = UserAttributes
> extends CommonEntityAttributes {
  createdBy?: T;
  updatedBy?: T;
}

@Entity()
export class BaseEntity extends CommonEntity implements BaseEntityAttributes {
  @ManyToOne('User', { nullable: true })
  createdBy?: UserAttributes;

  @ManyToOne('User', { nullable: true })
  updatedBy?: UserAttributes;

  @BeforeInsert()
  addCreatedByCMS() {
    cmsCreatedBy.call(this, CmsApiCLS);
  }

  @BeforeUpdate()
  addUpdatedByCMS() {
    cmsUpdatedBy.call(this, CmsApiCLS);
  }
}
