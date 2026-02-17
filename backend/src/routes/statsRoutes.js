// Comentário: Rotas de estatísticas individuais e leaderboard.
const express = require('express');
const { authMiddleware } = require('../middleware/auth');

function makeStatsRoutes(statsService) {
  const router = express.Router();

  router.get('/me', authMiddleware, async (req, res) => {
    const stats = await statsService.getUserStats(req.user.id);
    if (!stats) return res.status(404).json({ error: 'USER_NOT_FOUND' });
    return res.json(stats);
  });

  router.get('/leaderboard', authMiddleware, async (req, res) => {
    const data = await statsService.getLeaderboard(Number(req.query.limit || 10));
    res.json(data);
  });

  return router;
}

module.exports = { makeStatsRoutes };
