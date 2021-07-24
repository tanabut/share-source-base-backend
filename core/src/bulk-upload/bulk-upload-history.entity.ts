import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseEntity } from '../entities/base.entity';

export enum ProgressStatus {
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

export enum BulkUploadEntity {
  Product = 'product',
  Dealer = 'dealer',
  ProductCategory = 'productCategory',
  ProductDealer = 'productDealer',
  Price = 'price',
  Banner = 'banner',
  BannerDealer = 'bannerDealer',
  ProductCategoryCatalog = 'productCategoryCatalog',
  PaymentMethodDealer = 'paymentMethodDealer',
  Customer = 'customer',
  Region = 'region',
  Province = 'province',
  District = 'district',
  Subdistrict = 'subdistrict',
  PostalCode = 'postalCode',
  SaleOrderShipCode = 'saleOrderShipCode',
  userAccount = 'dealerUserAccount',
}

@Entity()
export class BulkUploadHistory extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BulkUploadEntity,
  })
  entity: BulkUploadEntity;

  @Column({
    type: 'jsonb',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];

  @Column({
    type: 'enum',
    enum: ProgressStatus,
    default: ProgressStatus.Pending,
  })
  syncStatus?: ProgressStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  syncError: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  lastSyncedDate: Date;
}
