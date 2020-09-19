const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  await knex('admins').truncate();
  await knex('admins').insert([
    {
      email: 'admin1@gmail.com',
      firstname: 'john',
      lastname: 'smith',
      password: await bcrypt.hash('password', 14),
      accountType: 'admin',
    },
    {
      email: 'admin2@gmail.com',
      firstname: 'marko',
      lastname: 'polo',
      password: await bcrypt.hash('password', 14),
      accountType: 'admin',
    },
  ]);
};
