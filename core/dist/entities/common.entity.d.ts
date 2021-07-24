import { BaseEntity } from 'typeorm';
export interface CommonEntityAttributes {
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class CommonEntity extends BaseEntity implements CommonEntityAttributes {
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=common.entity.d.ts.map