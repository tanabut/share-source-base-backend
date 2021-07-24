"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkUploadHistory = exports.BulkUploadEntity = exports.ProgressStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../entities/base.entity");
var ProgressStatus;
(function (ProgressStatus) {
    ProgressStatus["Pending"] = "pending";
    ProgressStatus["Success"] = "success";
    ProgressStatus["Error"] = "error";
})(ProgressStatus = exports.ProgressStatus || (exports.ProgressStatus = {}));
var BulkUploadEntity;
(function (BulkUploadEntity) {
    BulkUploadEntity["Product"] = "product";
    BulkUploadEntity["Dealer"] = "dealer";
    BulkUploadEntity["ProductCategory"] = "productCategory";
    BulkUploadEntity["ProductDealer"] = "productDealer";
    BulkUploadEntity["Price"] = "price";
    BulkUploadEntity["Banner"] = "banner";
    BulkUploadEntity["BannerDealer"] = "bannerDealer";
    BulkUploadEntity["ProductCategoryCatalog"] = "productCategoryCatalog";
    BulkUploadEntity["PaymentMethodDealer"] = "paymentMethodDealer";
    BulkUploadEntity["Customer"] = "customer";
    BulkUploadEntity["Region"] = "region";
    BulkUploadEntity["Province"] = "province";
    BulkUploadEntity["District"] = "district";
    BulkUploadEntity["Subdistrict"] = "subdistrict";
    BulkUploadEntity["PostalCode"] = "postalCode";
    BulkUploadEntity["SaleOrderShipCode"] = "saleOrderShipCode";
    BulkUploadEntity["userAccount"] = "dealerUserAccount";
})(BulkUploadEntity = exports.BulkUploadEntity || (exports.BulkUploadEntity = {}));
let BulkUploadHistory = class BulkUploadHistory extends base_entity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BulkUploadHistory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: BulkUploadEntity,
    }),
    __metadata("design:type", String)
], BulkUploadHistory.prototype, "entity", void 0);
__decorate([
    typeorm_1.Column({
        type: 'jsonb',
    }),
    __metadata("design:type", Array)
], BulkUploadHistory.prototype, "data", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: ProgressStatus,
        default: ProgressStatus.Pending,
    }),
    __metadata("design:type", String)
], BulkUploadHistory.prototype, "syncStatus", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], BulkUploadHistory.prototype, "syncError", void 0);
__decorate([
    typeorm_1.Column({
        type: 'timestamptz',
        nullable: true,
    }),
    __metadata("design:type", Date)
], BulkUploadHistory.prototype, "lastSyncedDate", void 0);
BulkUploadHistory = __decorate([
    typeorm_1.Entity()
], BulkUploadHistory);
exports.BulkUploadHistory = BulkUploadHistory;
//# sourceMappingURL=bulk-upload-history.entity.js.map