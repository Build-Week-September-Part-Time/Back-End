const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  await knex('students').truncate();
  await knex('students').insert([
    {
      email: 'jakegilman@gmail.com',
      firstname: 'jake',
      lastname: 'gilman',
      password: await bcrypt.hash('password', 14),
      accountType: 'student',
    },
    {
      email: 'macynicole@gmail.com',
      firstname: 'macy',
      lastname: 'nicole',
      password: await bcrypt.hash('password', 14),
      accountType: 'student',
    },
  ]);
};
