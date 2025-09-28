'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.User,{foreignKey: 'userId'});
      this.belongsTo(models.Category,{foreignKey: 'categoryId'}); 

    }
  }
  Transaction.init({
    userId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    type: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Transaction',
    timestamps: true,
  });
  return Transaction;
};