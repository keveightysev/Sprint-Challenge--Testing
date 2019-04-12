const request = require('supertest');

const db = require('../data/dbConfig.js');

const server = require('../server.js');

describe('Games router', () => {
	beforeEach(async () => {
		await db('games').truncate();
	});

	describe('POST /api/games', () => {
		it('should respond with 201 Created if data is good', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980,
			};
			const res = await request(server)
				.post('/api/games')
				.send(game);
			expect(res.status).toBe(201);
		});

		it('should respond with 422 if missing title or genre', async () => {
			const game1 = {
				genre: 'Arcade',
				releaseYear: 1980,
			};
			const res = await request(server)
				.post('/api/games/')
				.send(game1);
			expect(res.status).toBe(422);
			const game2 = {
				title: 'Pacman',
				releaseYear: 1980,
			};
			const res2 = await request(server)
				.post('/api/games/')
				.send(game2);
			expect(res2.status).toBe(422);
		});

		it('should return the freshly created game record', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980,
			};
			const res = await request(server)
				.post('/api/games')
				.send(game);
			expect(res.body).toEqual(
				expect.objectContaining({ id: 1, title: 'Pacman' }),
			);
		});
	});
});
