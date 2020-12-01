'use strict';
const {Sequelize, DataTypes,
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assistido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      this.hasMany(models.endereco, {
        foreignKey: 'id_assistido',
        as: 'enderecos'
      }),
      this.hasMany(models.telefone, {
        foreignKey: 'id_assistido',
        as: 'telefone'
      }),

      this.belongsTo(models.estado_civil, {
        foreignKey: 'id_estado_civil',
        as: 'estado_civil'
      })

      this.belongsToMany(models.projeto, {
        foreignKey: 'id_assistido',
        through: 'assistido_projeto',
        as: 'assisProj'
      })
      
    }
  };



  assistido.init({
    id_responsavel: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    nascimento: DataTypes.DATE,
    cpf: DataTypes.STRING,
    sexo: DataTypes.STRING,
    status: DataTypes.STRING,
    id_escolaridade: DataTypes.INTEGER,
    id_moradia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assistido',
    freezeTableName: true,
  });



  return assistido;
};