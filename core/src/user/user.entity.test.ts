import { EntityManager, getConnection, QueryRunner } from 'typeorm';

import { User } from './user.entity';
import { mockUsers } from './user.mock';

describe('User Entity', () => {
  let queryRunner: QueryRunner;
  let manager: EntityManager;

  beforeAll(async () => {
    const connection = await getConnection();
    queryRunner = connection.createQueryRunner();

    manager = queryRunner.manager;
  });

  beforeEach(async () => {
    await queryRunner.startTransaction();

    await manager.save(manager.create(User, mockUsers));
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
  });

  it('has been seeded test environment', async () => {
    const users = await manager.find(User);
    expect(users.length).toBeGreaterThanOrEqual(mockUsers.length);
  });

  it('password is encrypted', async () => {
    const { username, password } = mockUsers[0];
    const user = await manager.findOne(User, { username });
    expect(user?.password).not.toBe(password);
  });

  it('does not allow duplicate username', async () => {
    const newUser = manager.create(User, mockUsers[0]);
    await expect(manager.save(newUser)).rejects.toThrow(
      'violates unique constraint',
    );
  });
});
