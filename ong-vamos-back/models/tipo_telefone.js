'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_telefone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.telefone, {
        foreignKey: 'id_tipo_telefone',
        as: 'tipoTelefone'
      })
    }
  };
  tipo_telefone.init({
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipo_telefone',
    freezeTableName: true,
  });
  return tipo_telefone;
};