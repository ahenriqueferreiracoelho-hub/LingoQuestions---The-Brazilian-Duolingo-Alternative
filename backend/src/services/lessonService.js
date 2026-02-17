// Comentário: Serviço de lições contendo correção, repetição espaçada e ganho de XP.
const { computeNextReview } = require('../utils/spacedRepetition');

class LessonService {
  constructor(repository) {
    this.repository = repository;
  }

  async getLessonQuestions(lessonId) {
    return this.repository.listLessonQuestions(lessonId);
  }

  async submitAnswer({ userId, questionId, selectedOption }) {
    const question = await this.repository.getQuestionById(questionId);
    if (!question) throw new Error('QUESTION_NOT_FOUND');

    const correct = question.correctOption === selectedOption;
    const previous = await this.repository.getLastAttemptForQuestion(userId, questionId);
    const spaced = computeNextReview({
      currentEase: previous?.easeFactor,
      currentInterval: previous?.intervalDays,
      correct
    });

    const baseXP = 10;
    const xpGained = correct ? baseXP + question.difficulty * 2 : 0;
    const nextReviewAt = new Date(Date.now() + spaced.intervalDays * 86400000).toISOString();

    const attempt = await this.repository.recordAttempt({
      userId,
      questionId,
      selectedOption,
      correct,
      easeFactor: spaced.easeFactor,
      intervalDays: spaced.intervalDays,
      nextReviewAt,
      xpGained
    });

    const user = await this.repository.updateUserProgress({ userId, xpDelta: xpGained, studyDate: new Date().toISOString() });

    return {
      attempt,
      correct,
      correctOption: question.correctOption,
      xpGained,
      userProgress: { xp: user.xp, level: user.level, streak: user.streak }
    };
  }
}

module.exports = { LessonService };
