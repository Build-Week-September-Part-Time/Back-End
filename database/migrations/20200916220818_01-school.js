exports.up = async function (knex) {
  await knex.schema.createTable('admins', (table) => {
    table.increments('id');
    table.text('email').notNull().unique();
    table.text('firstname').notNull();
    table.text('lastname').notNull();
    table.text('password').notNull();
    table.text('accountType').notNull();
  });

  await knex.schema.createTable('volunteers', (table) => {
    table.increments('id');
    table.text('email').notNull().unique();
    table.text('firstname').notNull();
    table.text('lastname').notNull();
    table.text('password').notNull();
    table.text('availability').notNull();
    table.text('state').notNull();
    table.text('accountType').notNull();
  });

  await knex.schema.createTable('students', (table) => {
    table.increments('id');
    table.text('email').notNull().unique();
    table.text('firstname').notNull();
    table.text('lastname').notNull();
    table.text('password').notNull();
    table.text('accountType').notNull();
  });

  await knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.text('title').notNull();
    table.text('description').notNull();
    table.integer('volunteer_id').references('id').inTable('volunteers');
    table.text('volunteer_email').references('email').inTable('volunteers');
  });

  await knex.schema.createTable('student_volunteers', (table) => {
    table.integer('student_id').references('id').inTable('students');
    table.integer('volunteer_id').references('id').inTable('volunteers');
    table.primary(['student_id', 'volunteer_id']);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('student_volunteers');
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('students');
  await knex.schema.dropTableIfExists('volunteers');
  await knex.schema.dropTableIfExists('admins');
};
