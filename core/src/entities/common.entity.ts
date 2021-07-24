import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface CommonEntityAttributes {
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity()
export class CommonEntity extends BaseEntity implements CommonEntityAttributes {
  @Column({ type: 'boolean', default: true, nullable: false })
  isActive?: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
