'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'userId'})
    }
  }
  Notification.init({
    message: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'Notification',
    timestamps: true,
  });
  return Notification;
};