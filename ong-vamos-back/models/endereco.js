'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.assistido, {
        foreignKey: 'id_assistido',
        as: '_assistido'
      })
    }
  };


  endereco.init({
    logradouro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    cep: DataTypes.STRING,
    bairro: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    numero_comodos: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    id_tipo_moradia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'endereco',
    freezeTableName: true
  });



  return endereco;
};