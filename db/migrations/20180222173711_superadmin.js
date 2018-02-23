exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.boolean('super_admin');
  }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('super_admin');
  });     
};
