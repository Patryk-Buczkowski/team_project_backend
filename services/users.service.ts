import User from "../models/user.model";
import bcrypt from "bcrypt";
import { UserCreationAttributes } from "../models/user.model";
import { Op } from "sequelize";

const getByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

const create = async (user: UserCreationAttributes) => {
  return await User.create(user);
};

export const validateUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email: { [Op.iLike]: email } } });

  console.log("user.password", user?.password);

  if (!user) {
    throw new Error("User not found");
  }

  // if (!user.verified) {
  //   throw new Error("User is not verified");
  // }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("User password do not match");
  } else {
    return user;
  }
};

export const usersService = {
  getByEmail,
  create,
};
