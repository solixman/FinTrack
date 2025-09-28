'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    
    static associate(models) {
      this.hasMany(models.Notification,{foreignKey:'userId', onDelete: 'CASCADE',})
      this.hasMany(models.Transaction,{foreignKey:'userId', onDelete: 'CASCADE',})
      this.hasMany(models.Budget,{foreignKey:'userId', onDelete: 'CASCADE',})
      this.hasMany(models.SavingGoal,{foreignKey:'userId', onDelete: 'CASCADE',})

      
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    currency: DataTypes.FLOAT,
    preferences: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};