import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const generateActivationToken = () => {
  return uuidv4();
};

export const authService = {
  hashPassword,
  generateActivationToken,
};
