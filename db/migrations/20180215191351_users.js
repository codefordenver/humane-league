
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.boolean('twitter_actions');
    table.boolean('facebook_actions');
    table.boolean('email_actions');
    table.boolean('phone_actions');
    table.boolean('admin');
    table.string('name');
    table.string('email_address');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
