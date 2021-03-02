exports.up = function(knex) {
    return knex.schema.createTable('animals', function(table) {
        table.string('id_animal', 255).primary();
        table.string('specie', 255).notNullable();
        table.string('name', 255);
        table.string('race', 255);
        table.string('size', 255);
        table.string('description', 255);
        table.boolean('isPerdido');
        table.boolean('isAdocao');
        table.string('fk_id_user').unsigned();
        table.foreign('fk_id_user').references('id_user').inTable('users');
        table.foreign('fk_id_user').references('id_marker').inTable('markers');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('animals');
};
