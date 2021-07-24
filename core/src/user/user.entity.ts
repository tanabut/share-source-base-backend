import bcrypt from 'bcrypt';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { CmsApiCLS } from '../cls';
import { CommonEntity } from '../entities/common.entity';
import { cmsCreatedBy, cmsUpdatedBy } from '../entities/entity.event-helpers';

import { UserRole } from './user-role';
import { USER_PASSWORD_SALT_ROUNDS } from './user.constants';
import { UserAttributes } from './user.types';

@Entity()
export class User extends CommonEntity implements UserAttributes {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @ManyToOne(() => User, { nullable: true })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  updatedBy?: User;

  @BeforeInsert()
  addCreatedByCMS() {
    cmsCreatedBy.call(this, CmsApiCLS);
  }

  @BeforeUpdate()
  addUpdatedByCMS() {
    cmsUpdatedBy.call(this, CmsApiCLS);
  }

  @BeforeInsert()
  encryptPassword() {
    this.password = bcrypt.hashSync(this.password, USER_PASSWORD_SALT_ROUNDS);
  }

  toJSON() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete this.password;
    return this;
  }
}
