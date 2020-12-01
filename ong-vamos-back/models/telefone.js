'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class telefone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.tipo_telefone, {
        foreignKey: 'id_tipo_telefone',
        as: 'telefone_tipo'
      }),
      this.belongsTo(models.assistido, {
        foreignKey: 'id_assistido',
        as: 'telAssistido'
      })
    }
  };
  telefone.init({
    ddd: DataTypes.STRING,
    numero: DataTypes.STRING,
    id_tipo_telefone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'telefone',
    freezeTableName: true
  });
  return telefone;
};