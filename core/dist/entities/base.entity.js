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
exports.BaseEntity = void 0;
const typeorm_1 = require("typeorm");
const cls_1 = require("../cls");
const entity_event_helpers_1 = require("./entity.event-helpers");
const common_entity_1 = require("./common.entity");
let BaseEntity = class BaseEntity extends common_entity_1.CommonEntity {
    addCreatedByCMS() {
        entity_event_helpers_1.cmsCreatedBy.call(this, cls_1.CmsApiCLS);
    }
    addUpdatedByCMS() {
        entity_event_helpers_1.cmsUpdatedBy.call(this, cls_1.CmsApiCLS);
    }
};
__decorate([
    typeorm_1.ManyToOne('User', { nullable: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.ManyToOne('User', { nullable: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "updatedBy", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseEntity.prototype, "addCreatedByCMS", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseEntity.prototype, "addUpdatedByCMS", null);
BaseEntity = __decorate([
    typeorm_1.Entity()
], BaseEntity);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map