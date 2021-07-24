import bcrypt from 'bcrypt';
import { FindConditions, FindOneOptions } from 'typeorm';

import { User } from './user.entity';
import { UserAttributes } from './user.types';

type UserAttributesInput = UserAttributes & {
  regions: string[];
};

function comparePassword(user: User, password: string) {
  return bcrypt.compareSync(password, user.password);
}

export async function fetchAllUsers() {
  return User.find();
}

export async function findOneUser(
  conditions: FindConditions<User>,
  options?: FindOneOptions<User>,
) {
  return User.findOne(conditions, options);
}

export async function createUser(attrs: UserAttributesInput) {
  return User.create(attrs).save();
}

export async function updateUser(
  id: number,
  attrs: Partial<UserAttributesInput>,
) {
  attrs.regions = attrs.regions || [];

  const user = await User.findOne({ id });

  if (!user) {
    throw new Error('User not found');
  }

  Object.assign(user, attrs);

  if (attrs.password) {
    user.encryptPassword();
  }

  return user.save();
}

export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await findOneUser(
    { username, isActive: true },
    { relations: ['regions'] },
  );

  if (!user) {
    throw new Error('User not found');
  }

  if (!comparePassword(user, password)) {
    throw new Error('Incorrect password');
  }

  return user;
}
