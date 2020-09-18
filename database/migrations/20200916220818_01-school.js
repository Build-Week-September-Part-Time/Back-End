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
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('students');
  await knex.schema.dropTableIfExists('voluneteers');
  await knex.schema.dropTableIfExists('admins');
};
