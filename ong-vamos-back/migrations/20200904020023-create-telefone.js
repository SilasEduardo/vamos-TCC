'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('telefone', {
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
      ddd: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      id_tipo_telefone: {
        type: Sequelize.INTEGER,
        references: { model: 'tipo_telefone', key: 'id'}
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
    await queryInterface.dropTable('telefone');
  }
};