
exports.up = function(knex, Promise) {
  return knex.schema.table('action_log', table => {
    table.string('action_title');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('action_log', table => {
    table.dropColumn('action_title');
  });
};
