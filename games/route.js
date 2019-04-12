const router = require('express').Router();

const Games = require('./model.js');

router.post('/', async (req, res) => {
	if (!req.body.title || !req.body.genre) {
		res.status(422).json({ message: 'Please include a title and genere' });
		return;
	}
	try {
		const game = await Games.add(req.body);
		res.status(201).json(game);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error adding game' });
	}
});

router.get('/', async (req, res) => {
	try {
		const games = await Games.findAll();
		res.status(200).json(games);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error retrieving games' });
	}
});

module.exports = router;
