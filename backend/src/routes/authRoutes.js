// Comentário: Rotas de autenticação de usuário (cadastro e login).
const express = require('express');

function makeAuthRoutes(authService) {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const data = await authService.register({ name, email, password });
      res.status(201).json(data);
    } catch (error) {
      const status = error.message === 'EMAIL_ALREADY_IN_USE' ? 409 : 400;
      res.status(status).json({ error: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await authService.login({ email, password });
      res.json(data);
    } catch (error) {
      const status = error.message === 'INVALID_CREDENTIALS' ? 401 : 400;
      res.status(status).json({ error: error.message });
    }
  });

  return router;
}

module.exports = { makeAuthRoutes };
