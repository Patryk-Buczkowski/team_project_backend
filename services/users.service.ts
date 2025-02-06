import User from '../models/user.model';
import { UserCreationAttributes } from '../models/user.model';

const getByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

const create = async (user: UserCreationAttributes) => {
  return await User.create(user);
};

export const usersService = {
  getByEmail,
  create,
};
