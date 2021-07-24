import {
  clearMockUsers,
  insertMockUsers,
  mockUsers,
} from '@share-source-base/core/dist/user/user.mock';
import { UserRole } from '@share-source-base/core/dist/user/user-role';
import { findOneUser } from '@share-source-base/core/dist/user/user.service';
import { Connection, getConnection } from 'typeorm';

import { getAppRequest } from '../__tests/appHelpers';

describe('User Routes', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = getConnection();
    await insertMockUsers(connection.manager);
  });
  afterAll(async () => {
    await clearMockUsers(connection.manager);
  });

  describe('GET /', () => {
    it('returns all users', async () => {
      const id = 1;
      const request = getAppRequest(id);
      const { status, body } = await request.get('/api/users');
      expect(body.length).toBeGreaterThanOrEqual(mockUsers.length + 1);
      expect(body[0].password).toBeUndefined();
      expect(status).toBe(200);
    });
  });

  describe('POST /', () => {
    it('creates user successfully', async () => {
      const request = getAppRequest(1);
      const input = {
        username: 'test_username',
        password: 'test_password',
        role: UserRole.Admin,
        regions: ['0'],
        isActive: true,
      };

      const { status } = await request
        .post('/api/users')
        .send(input)
        .set('Accept', 'application/json');

      expect(status).toBe(200);
    });
  });

  describe('PUT /:id', () => {
    it('updates without re-encrypting old password if password not sent', async () => {
      const id = 5;
      const request = getAppRequest(id);

      const userBefore = await findOneUser({ id });

      const { status } = await request
        .put(`/api/users/${id}`)
        .send({ isActive: !userBefore?.isActive })
        .set('Accept', 'application/json');

      expect(status).toBe(200);

      const userAfter = await findOneUser({ id });
      expect(userAfter?.isActive).not.toBe(userAfter?.isActive);
      expect(userAfter?.password).toBe(userAfter?.password);
    });

    it('updates and encrypts new password', async () => {
      const id = 4;
      const request = getAppRequest(id);
      const newPassword = 'newpass';

      const userBefore = await findOneUser({ id });

      const { status } = await request
        .put(`/api/users/${id}`)
        .send({ password: newPassword })
        .set('Accept', 'application/json');

      expect(status).toBe(200);

      const userAfter = await findOneUser({ id });
      expect(userAfter?.password).not.toBe(userAfter?.password);
      expect(newPassword).not.toBe(userAfter?.password);
    });

    it('updates regions successfully', async () => {
      const request = getAppRequest(1);
      const id = 3;

      const userBefore = await findOneUser(
        { id },
        { relations: ['regions'] },
      );
      // expect(userBefore?.regions).toHaveLength(1);
      // expect(userBefore?.regions[0].code).toBe('0');

      const { status } = await request
        .put(`/api/users/${id}`)
        .send({ regions: ['1', '2', '3'] })
        .set('Accept', 'application/json');

      expect(status).toBe(200);

      // const userAfter = await findOneUser({ id }, { relations: ['regions'] });
      // expect(userAfter?.regions).toHaveLength(3);
    });
  });
});
