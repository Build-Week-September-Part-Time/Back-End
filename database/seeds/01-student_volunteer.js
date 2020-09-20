exports.seed = async function (knex) {
  await knex('student_volunteers').truncate();
  await knex('student_volunteers').insert([
    {
      student_email: 'jakegilman@gmail.com',
      volunteer_email: 'volunteer1@gmail.com',
    },
    {
      student_email: 'jakegilman@gmail.com',
      volunteer_email: 'volunteer2@gmail.com',
    },
    {
      student_email: 'jakegilman@gmail.com',
      volunteer_email: 'volunteer3@gmail.com',
    },
    {
      student_email: 'jakegilman@gmail.com',
      volunteer_email: 'volunteer4@gmail.com',
    },
    {
      student_email: 'macynicole@gmail.com',
      volunteer_email: 'volunteer1@gmail.com',
    },
    {
      student_email: 'macynicole@gmail.com',
      volunteer_email: 'volunteer2@gmail.com',
    },
    {
      student_email: 'macynicole@gmail.com',
      volunteer_email: 'volunteer3@gmail.com',
    },
  ]);
};
