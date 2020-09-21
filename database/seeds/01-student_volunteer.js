exports.seed = async function (knex) {
  await knex('student_volunteers').truncate();
  await knex('student_volunteers').insert([
    {
      student_id: '1',
      volunteer_id: '1',
    },
    {
      student_id: '1',
      volunteer_id: '2',
    },
    {
      student_id: '1',
      volunteer_id: '3',
    },
    {
      student_id: '1',
      volunteer_id: '4',
    },
    {
      student_id: '2',
      volunteer_id: '1',
    },
    {
      student_id: '2',
      volunteer_id: '2',
    },
    {
      student_id: '2',
      volunteer_id: '3',
    },
  ]);
};
