const bcrypt = require('bcrypt');
exports.seed = async function (knex) {
  await knex('volunteers').truncate();
  await knex('volunteers').insert([
    {
      email: 'volunteer1@gmail.com',
      firstname: 'Amy',
      lastname: 'Baker',
      password: await bcrypt.hash('password', 14),
      availability: 'Weekends',
      state: 'Arizona',
      accountType: 'volunteer',
    },
    {
      email: 'volunteer2@gmail.com',
      firstname: 'Christy',
      lastname: 'Derek',
      password: await bcrypt.hash('password', 14),
      availability: 'Every day',
      state: 'Colorado',
      accountType: 'volunteer',
    },
    {
      email: 'volunteer3@gmail.com',
      firstname: 'Edward',
      lastname: 'Fair',
      password: await bcrypt.hash('password', 14),
      availability: 'Weekdays',
      state: 'Florida',
      accountType: 'volunteer',
    },
    {
      email: 'volunteer4@gmail.com',
      firstname: 'Gary',
      lastname: 'Hughes',
      password: await bcrypt.hash('password', 14),
      availability: 'Weekends',
      state: 'Texas',
      accountType: 'volunteer',
    },
  ]);
};
