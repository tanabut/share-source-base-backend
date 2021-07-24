import { CommonEntity } from '../entities/common.entity';
import { UserRole } from './user-role';
import { UserAttributes } from './user.types';
export declare class User extends CommonEntity implements UserAttributes {
    id?: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    role: UserRole;
    createdBy?: User;
    updatedBy?: User;
    addCreatedByCMS(): void;
    addUpdatedByCMS(): void;
    encryptPassword(): void;
    toJSON(): this;
}
//# sourceMappingURL=user.entity.d.ts.map