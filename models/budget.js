'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey: 'userId'})
      this.belongsTo(models.Category,{foreignKey: 'userId'})
    }
  }
  Budget.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    limitAmount: DataTypes.FLOAT,
    month: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Budget',
    timestamps: true,
  });
  return Budget;
};