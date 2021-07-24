import { FindConditions, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import { UserAttributes } from './user.types';
declare type UserAttributesInput = UserAttributes & {
    regions: string[];
};
export declare function fetchAllUsers(): Promise<User[]>;
export declare function findOneUser(conditions: FindConditions<User>, options?: FindOneOptions<User>): Promise<User | undefined>;
export declare function createUser(attrs: UserAttributesInput): Promise<User>;
export declare function updateUser(id: number, attrs: Partial<UserAttributesInput>): Promise<User>;
export declare function loginUser({ username, password, }: {
    username: string;
    password: string;
}): Promise<User>;
export {};
//# sourceMappingURL=user.service.d.ts.map