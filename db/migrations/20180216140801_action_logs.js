
exports.up = function(knex, Promise) {
  return knex.schema.createTable('action_log', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('action_id');
    table.string('action_type');
    table.text('description', 'longtext');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('action_log');
};
