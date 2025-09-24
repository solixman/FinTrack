'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
      this.belongsTo(models.Role, {foreignKey: 'roleId'});
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
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};