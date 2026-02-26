// Comentário: Teste de integração cobrindo cadastro, login e resposta de lição.
const request = require('supertest');
const { createApp } = require('../src/app');

const app = createApp();

describe('API flow', () => {
  let token;

  test('register', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Maria',
      email: 'maria@email.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test('get questions', async () => {
    const res = await request(app)
      .get('/api/lessons/1/questions')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('submit answer and read stats', async () => {
    const answer = await request(app)
      .post('/api/lessons/answer')
      .set('Authorization', `Bearer ${token}`)
      .send({ questionId: 1, selectedOption: 0 });
    expect(answer.statusCode).toBe(200);
    expect(answer.body.correct).toBe(true);

    const stats = await request(app)
      .get('/api/stats/me')
      .set('Authorization', `Bearer ${token}`);
    expect(stats.statusCode).toBe(200);
    expect(stats.body.xp).toBeGreaterThan(0);
  });
});
