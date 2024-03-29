exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.string('id_user', 255).primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('cellphone', 255).notNullable();
        table.string('password', 255).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
