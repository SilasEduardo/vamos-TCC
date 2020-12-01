'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    this.belongsToMany(models.assistido, {
        foreignKey: 'id_projeto',
        through: 'assistido_projeto',
        as: 'projetosAssistidos'
      })
    }
  };
  projeto.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    local: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projeto',
    freezeTableName: true,
  });
  return projeto;
};