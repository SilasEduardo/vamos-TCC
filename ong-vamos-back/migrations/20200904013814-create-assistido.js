'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assistido', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_responsavel: {
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      nascimento: {
        type: Sequelize.DATE
      },
      cpf: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.STRING
      },
      id_escolaridade: {
        type: Sequelize.INTEGER
      },
      id_estado_civil: {
        type: Sequelize.INTEGER
      },
      id_moradia: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assistido');
  }
};