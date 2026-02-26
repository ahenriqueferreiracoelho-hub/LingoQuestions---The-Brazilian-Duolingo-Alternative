// Comentário: Rotas de lição para listar perguntas e enviar resposta do usuário.
const express = require('express');
const { authMiddleware } = require('../middleware/auth');

function makeLessonRoutes(lessonService) {
  const router = express.Router();

  router.get('/:lessonId/questions', authMiddleware, async (req, res) => {
    const questions = await lessonService.getLessonQuestions(req.params.lessonId);
    const sanitized = questions.map((q) => ({ id: q.id, lessonId: q.lessonId, prompt: q.prompt, options: q.options, difficulty: q.difficulty }));
    res.json(sanitized);
  });

  router.post('/answer', authMiddleware, async (req, res) => {
    try {
      const result = await lessonService.submitAnswer({
        userId: req.user.id,
        questionId: Number(req.body.questionId),
        selectedOption: Number(req.body.selectedOption)
      });
      res.json(result);
    } catch (error) {
      const status = error.message === 'QUESTION_NOT_FOUND' ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  });

  return router;
}

module.exports = { makeLessonRoutes };
