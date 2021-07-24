import { BaseEntity } from '../entities/base.entity';
export declare enum ProgressStatus {
    Pending = "pending",
    Success = "success",
    Error = "error"
}
export declare enum BulkUploadEntity {
    Product = "product",
    Dealer = "dealer",
    ProductCategory = "productCategory",
    ProductDealer = "productDealer",
    Price = "price",
    Banner = "banner",
    BannerDealer = "bannerDealer",
    ProductCategoryCatalog = "productCategoryCatalog",
    PaymentMethodDealer = "paymentMethodDealer",
    Customer = "customer",
    Region = "region",
    Province = "province",
    District = "district",
    Subdistrict = "subdistrict",
    PostalCode = "postalCode",
    SaleOrderShipCode = "saleOrderShipCode",
    userAccount = "dealerUserAccount"
}
export declare class BulkUploadHistory extends BaseEntity {
    id: number;
    entity: BulkUploadEntity;
    data: any[];
    syncStatus?: ProgressStatus;
    syncError: string;
    lastSyncedDate: Date;
}
//# sourceMappingURL=bulk-upload-history.entity.d.ts.map