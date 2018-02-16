
exports.up = function(knex, Promise) {
  return knex.schema.createTable('email_actions', (table) => {
    table.increments('id').primary();
    table.boolean('enabled');
    table.string('title');
    table.text('description', 'longtext');
    table.string('to');
    table.string('cc');
    table.string('bcc');
    table.string('subject');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('email_actions');
};
