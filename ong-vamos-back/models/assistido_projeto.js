'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assistido_projeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  assistido_projeto.init({
    id_assistido: DataTypes.INTEGER,
    id_projeto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assistido_projeto',
    freezeTableName: true
  });
  return assistido_projeto;
};