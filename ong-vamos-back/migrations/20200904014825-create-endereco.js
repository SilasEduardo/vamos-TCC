'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('endereco', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_assistido: {
        type: Sequelize.INTEGER,
        references: { model: 'assistido', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      logradouro: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.INTEGER
      },
      complemento: {
        type: Sequelize.STRING
      },
      numero_comodos: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      },
      id_tipo_moradia: {
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
    await queryInterface.dropTable('endereco');
  }
};