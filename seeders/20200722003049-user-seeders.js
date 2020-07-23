'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: "Naura",
        profession: "Bayi Lucu",
        role: "admin",
        email: "itsme@rara.cute",
        password: await bcrypt.hash('naurara', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Sri Andeani",
        profession: "IOS Developer",
        role: "student",
        email: "itsme@dian.dev",
        password: await bcrypt.hash('aandeani', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
