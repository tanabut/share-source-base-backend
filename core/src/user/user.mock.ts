import { DeepPartial, EntityManager } from 'typeorm';

import { UserRole } from './user-role';
import { User } from './user.entity';

export const mockUsers: DeepPartial<User>[] = [
  {
    username: 'admin',
    password: 'admin',
    firstname: 'Admin 1',
    lastname: '',
    role: UserRole.Admin,
    isActive: true,
  },
  {
    username: 'Inactive',
    password: 'admin',
    firstname: 'Inactive 1',
    lastname: '',
    role: UserRole.Admin,
    isActive: false,
  },
  {
    username: 'maintainer',
    password: 'maintainer',
    firstname: 'Maintainer 1',
    lastname: '',
    role: UserRole.Maintainer,
    isActive: true,
  },
  {
    username: 'viewer',
    password: 'viewer',
    firstname: 'Viewer 1',
    lastname: '',
    role: UserRole.Viewer,
    isActive: true,
  },
];

export async function insertMockUsers(tManager: EntityManager) {
  const userRepo = tManager.getRepository(User);
  await userRepo.save(userRepo.create(mockUsers));
}

export async function clearMockUsers(tManager: EntityManager) {
  const userRepo = tManager.getRepository(User);
  await userRepo.delete({ isActive: true });
  await userRepo.delete({ isActive: false });
}
