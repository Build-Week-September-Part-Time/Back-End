exports.seed = async function (knex) {
  await knex('students').truncate();
  await knex('students').insert([
    {
      email: 'jakegilman@gmail.com',
      firstname: 'jake',
      lastname: 'gilman',
      password: 'password',
      accountType: 'student',
    },
    {
      email: 'macynicole@gmail.com',
      firstname: 'macy',
      lastname: 'nicole',
      password: 'password',
      accountType: 'student',
    },
  ]);
};
