'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(models.Transaction, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(models.Budget, { foreignKey: 'userId', onDelete: 'CASCADE' });
      this.hasMany(models.SavingGoal, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    preferences: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'MAD',
    },
    resetToken: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
    status: {
      type: DataTypes.ENUM('active', 'suspended', 'deleted'),
      defaultValue: 'active',
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });

  return User;
};
 