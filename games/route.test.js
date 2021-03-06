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

	describe('GET /api/games', () => {
		it('should respond with status 200 OK', async () => {
			const res = await request(server).get('/api/games');
			expect(res.status).toBe(200);
		});

		it('should return an empty array if there are no games', async () => {
			const res = await request(server).get('/api/games');
			expect(res.body).toEqual([]);
		});

		it('should return an array of objects if games are stored', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980,
			};
			const post = await request(server)
				.post('/api/games')
				.send(game);
			const res = await request(server).get('/api/games');

			expect(res.body).toEqual(expect.arrayContaining([post.body]));
		});
	});

	describe('GET /api/games/:id', () => {
		it('should return status 200 OK', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980,
			};
			await request(server)
				.post('/api/games/')
				.send(game);
			const res = await request(server).get('/api/games/1');
			expect(res.status).toBe(200);
		});

		it('should return status 404 if user not found', async () => {
			const res = await request(server).get('/api/games/1');
			expect(res.status).toBe(404);
		});

		it('should return the game with the id', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980,
			};
			await request(server)
				.post('/api/games')
				.send(game);
			const res = await request(server).get('/api/games/1');

			expect(res.body).toEqual(
				expect.objectContaining({ id: 1, title: 'Pacman' }),
			);
		});
	});

	describe('DELETE /api/games/:id', () => {
		it('should return status 404 if item not found', async () => {
			const res = await request(server).delete('/api/games/1');
			expect(res.status).toBe(404);
		});

		it('should return status 200 if item deleted', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980,
			};
			await request(server)
				.post('/api/games')
				.send(game);
			const res = await request(server).delete('/api/games/1');
			expect(res.status).toBe(200);
		});

		it('should actually delete the item', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980,
			};
			await request(server)
				.post('/api/games')
				.send(game);
			await request(server).delete('/api/games/1');
			const res = await request(server).get('/api/games');
			expect(res.body).toEqual([]);
		});
	});
});
