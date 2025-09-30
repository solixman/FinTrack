'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavingGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey:'userId'})
    }
  }
  SavingGoal.init({
    userId: DataTypes.INTEGER,
    targetAmount: DataTypes.FLOAT,
    targetDate: DataTypes.DATE,
    purpose:DataTypes.STRING,
    status:DataTypes.STRING,
    currentAmount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'SavingGoal',
    timestamps: true,
  });
  return SavingGoal;
};