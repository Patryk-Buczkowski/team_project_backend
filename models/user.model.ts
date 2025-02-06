import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/db';

interface UserAttributes {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'user' | 'moderator' | 'admin';
  activationToken: string | null;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  name!: string;
  surname!: string;
  email!: string;
  password!: string;
  role!: 'user' | 'moderator' | 'admin';
  activationToken!: string | null;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('user', 'moderator', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    activationToken: { type: DataTypes.UUID, allowNull: true },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  },
);

export default User;
