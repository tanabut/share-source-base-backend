import { CommonEntityAttributes } from '../entities/common.entity';
import { UserRole } from './user-role';
export interface UserAttributes extends CommonEntityAttributes {
    id?: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    role: UserRole;
    createdBy?: UserAttributes;
    updatedBy?: UserAttributes;
}
//# sourceMappingURL=user.types.d.ts.map