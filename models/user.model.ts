import { DataTypes } from 'sequelize';
import sequelize from '../utils/db';

const User = sequelize.define('user', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM('user', 'moderator', 'admin'),
    allowNull: false,
    defaultValue: 'user',
  },
  activationToken: { type: DataTypes.UUID },
});

export default User;
