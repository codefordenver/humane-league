
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('twitter_contents', (table) => {
      table.increments('id').primary();
      table.foreign('action_id').references('twitter_actions.id');
      table.text('content', 'longtext');
    }),

    knex.schema.createTable('facebook_contents', (table) => {
      table.increments('id').primary();
      table.foreign('action_id').references('facebook_actions.id');
      table.text('content', 'longtext');
    }),

    knex.schema.createTable('email_contents', (table) => {
      table.increments('id').primary();
      table.foreign('action_id').references('email_actions.id');
      table.text('content', 'longtext');
    }),

    knex.schema.createTable('phone_contents', (table) => {
      table.increments('id').primary();
      table.foreign('action_id').references('phone_actions.id');
      table.text('content', 'longtext');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('twitter_contents'),
    knex.schema.dropTable('facebook_contents'),
    knex.schema.dropTable('email_contents'),
    knex.schema.dropTable('phone_contents')
  ]);
};
