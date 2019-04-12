const express = require('express');

const games = require('./games/route.js');

const server = express();

server.use(express.json());

server.use('/api/games', games);

server.get('/', (req, res) => {
	res.status(200).send(`
        <h1>This is my server</h1>
        <h2>There are others like it but this one is mine</h2>
    `);
});

module.exports = server;
