'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class estado_civil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.assistido, {
        foreignKey: 'id_estado_civil',
        as: 'estado_civil_assistido'
      })
    }
  };
  estado_civil.init({
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'estado_civil',
    freezeTableName: true
  })
  return estado_civil
};
