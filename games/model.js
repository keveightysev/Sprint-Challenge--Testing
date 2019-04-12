const db = require('../data/dbConfig.js');

const add = async game => {
	const [id] = await db('games').insert(game);
	return db('games')
		.where({ id })
		.first();
};

module.exports = { add };
