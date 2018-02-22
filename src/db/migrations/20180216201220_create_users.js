exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('user_uuid').notNullable();
    table.string('name');
    table
      .string('email')
      .unique()
      .notNullable();
    table
      .string('username')
      .unique()
      .notNullable();
    table.string('password').notNullable();
    table.string('class');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.dropTable('users');
};
