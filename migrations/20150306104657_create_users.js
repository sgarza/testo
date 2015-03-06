'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Users', function(t) {
      t.increments('id').primary();
      t.string('name', 510).defaultTo(null);
      t.string('email').index().unique();
      t.string('password', 510);
      t.dateTime('createdAt');
      t.dateTime('updatedAt');
    })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Users')
  ]);
};
