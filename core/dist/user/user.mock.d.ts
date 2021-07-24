import { DeepPartial, EntityManager } from 'typeorm';
import { User } from './user.entity';
export declare const mockUsers: DeepPartial<User>[];
export declare function insertMockUsers(tManager: EntityManager): Promise<void>;
export declare function clearMockUsers(tManager: EntityManager): Promise<void>;
//# sourceMappingURL=user.mock.d.ts.map