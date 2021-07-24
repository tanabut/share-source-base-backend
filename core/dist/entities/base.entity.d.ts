import { CommonEntity, CommonEntityAttributes } from './common.entity';
import { UserAttributes } from '../user/user.types';
export interface BaseEntityAttributes<T extends UserAttributes = UserAttributes> extends CommonEntityAttributes {
    createdBy?: T;
    updatedBy?: T;
}
export declare class BaseEntity extends CommonEntity implements BaseEntityAttributes {
    createdBy?: UserAttributes;
    updatedBy?: UserAttributes;
    addCreatedByCMS(): void;
    addUpdatedByCMS(): void;
}
//# sourceMappingURL=base.entity.d.ts.map