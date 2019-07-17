exports.up = function(knex) {
	return knex.schema.createTable('games', table => {
		table.increments();
		table.string('title').notNullable();
		table.string('genre').notNullable();
		table.integer('releaseYear');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('games');
};
