exports.up = function(knex) {
    return knex.schema.createTable('markers', function(table) {
        table.string('id_marker', 255).primary();
        table.string('latitude', 255).notNullable();
        table.string('longitude', 255).notNullable();
        table.string('street', 255).notNullable();
        table.string('fk_id_user').unsigned();
        table.foreign('fk_id_user').references('id_user').inTable('users');
        table.string('fk_id_animal').unsigned();
        table.foreign('fk_id_animal').references('id_animal').inTable('animals');
        table.timestamps(true, true);
    });
    
};

exports.down = function(knex) {
    return knex.schema.dropTable('markers');
};
