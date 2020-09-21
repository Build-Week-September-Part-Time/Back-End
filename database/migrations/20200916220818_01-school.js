exports.up = async function (knex) {
  await knex.schema.createTable('admins', (table) => {
    table.increments('id');
    table.text('email').notNullable().unique();
    table.text('firstname').notNullable();
    table.text('lastname').notNullable();
    table.text('password').notNullable();
    table.text('accountType').notNullable();
  });

  await knex.schema.createTable('volunteers', (table) => {
    table.increments('id');
    table.text('email').notNullable().unique();
    table.text('firstname').notNullable();
    table.text('lastname').notNullable();
    table.text('password').notNullable();
    table.text('availability').notNullable();
    table.text('state').notNullable();
    table.text('accountType').notNullable();
  });

  await knex.schema.createTable('students', (table) => {
    table.increments('id');
    table.text('email').notNullable().unique();
    table.text('firstname').notNullable();
    table.text('lastname').notNullable();
    table.text('password').notNullable();
    table.text('accountType').notNullable();
  });

  await knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.text('title').notNullable();
    table.text('description').notNullable();
    table
      .integer('volunteer_id')
      .notNullable()
      .references('id')
      .inTable('volunteers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // table
    //   .text('volunteer_email')
    //   .notNullable()
    //   .references('email')
    //   .inTable('volunteers')
    //   .onDelete('CASCADE')
    //   .onUpdate('CASCADE');


  });
};

//commment

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('students');
  await knex.schema.dropTableIfExists('volunteers');
  await knex.schema.dropTableIfExists('admins');
};
