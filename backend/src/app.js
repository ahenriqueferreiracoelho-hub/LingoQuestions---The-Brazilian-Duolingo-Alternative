// Comentário: Monta aplicação Express com injeção de dependências dos serviços.
const express = require('express');
const cors = require('cors');
const { repository } = require('./repositories');
const { AuthService } = require('./services/authService');
const { LessonService } = require('./services/lessonService');
const { StatsService } = require('./services/statsService');
const { makeAuthRoutes } = require('./routes/authRoutes');
const { makeLessonRoutes } = require('./routes/lessonRoutes');
const { makeStatsRoutes } = require('./routes/statsRoutes');

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const authService = new AuthService(repository);
  const lessonService = new LessonService(repository);
  const statsService = new StatsService(repository);

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', makeAuthRoutes(authService));
  app.use('/api/lessons', makeLessonRoutes(lessonService));
  app.use('/api/stats', makeStatsRoutes(statsService));

  return app;
}

module.exports = { createApp };
