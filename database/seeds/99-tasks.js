exports.seed = async function (knex) {
  await knex('tasks').del();
  await knex('tasks').insert([
    {
      title: 'Icebreaker',
      description:
        'Complete a meet and greet with the students so they can get to know each other!',
      volunteer_id: 1,
      volunteer_email: 'volunteer1@gmail.com',
    },
    {
      title: 'Icebreaker',
      description:
        'Complete a meet and greet with the students so they can get to know each other!',
      volunteer_id: 2,
      volunteer_email: 'volunteer2@gmail.com',
    },
    {
      title: 'Icebreaker',
      description:
        'Complete a meet and greet with the students so they can get to know each other!',
      volunteer_id: 3,
      volunteer_email: 'volunteer3@gmail.com',
    },
    {
      title: 'Icebreaker',
      description:
        'Complete a meet and greet with the students so they can get to know each other!',
      volunteer_id: 4,
      volunteer_email: 'volunteer4@gmail.com',
    },
    {
      title: 'History',
      description: 'Complete a history lesson from chapters 1 thru 5.',
      volunteer_id: 1,
      volunteer_email: 'volunteer1@gmail.com',
    },
    {
      title: 'History Assignment',
      description: 'Assign a take home history quiz over chapters 1 thru 5.',
      volunteer_id: 1,
      volunteer_email: 'volunteer1@gmail.com',
    },
    {
      title: 'History Bonus',
      description:
        'Work through the questions in the back of the book for bonus points',
      volunteer_id: 1,
      volunteer_email: 'volunteer1@gmail.com',
    },
    {
      title: 'English',
      description: 'Assign 3 books for the students to read',
      volunteer_id: 2,
      volunteer_email: 'volunteer2@gmail.com',
    },
    {
      title: 'English Papers',
      description:
        'For each book, complete a 5 page literary analysis on the main characters',
      volunteer_id: 2,
      volunteer_email: 'volunteer2@gmail.com',
    },
    {
      title: 'Math',
      description: 'Complete chapters 10 and 11',
      volunteer_id: 3,
      volunteer_email: 'volunteer3@gmail.com',
    },
    {
      title: 'Math Proofs',
      description: 'Complete the proofs in the back of the book',
      volunteer_id: 3,
      volunteer_email: 'volunteer3@gmail.com',
    },
    {
      title: 'Biology',
      description: 'Study the anatomy of frogs for fridays disection',
      volunteer_id: 4,
      volunteer_email: 'volunteer4@gmail.com',
    },
    {
      title: 'Biology Disection',
      description:
        'Partner up and complete your frogs disection by the end of class',
      volunteer_id: 4,
      volunteer_email: 'volunteer4@gmail.com',
    },
    {
      title: 'Biology Analysis',
      description: 'Write up an analysis on your frogs disection',
      volunteer_id: 4,
      volunteer_email: 'volunteer4@gmail.com',
    },
  ]);
};
