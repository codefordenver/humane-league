
exports.up = function(knex, Promise) {
  return knex.schema.createTable('phone_actions', (table) => {
    table.increments('id').primary();
    table.boolean('enabled');
    table.string('title');
    table.text('description', 'longtext');
    table.string('name');
    table.string('position');
    table.string('phone_number');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('phone_actions');
};
