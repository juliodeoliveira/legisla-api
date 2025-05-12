'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Documents', [
      {
        title: 'Documento de Exemplo 1',
        content: 'Conteúdo fictício para o documento 1',
        user_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Documento de Exemplo 2',
        content: 'Conteúdo fictício para o documento 2',
        user_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Documento de Exemplo 3',
        content: 'Mais conteúdo para teste',
        user_id: 7,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Documento de Exemplo 4',
        content: 'Outro conteúdo de teste',
        user_id: 8,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Documents', null, {});
  }
};
