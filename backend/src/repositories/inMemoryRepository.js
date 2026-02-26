// Comentário: Repositório em memória para desenvolvimento local e testes sem banco externo.
const bcrypt = require('bcryptjs');
const seed = require('../db/mockData');

class InMemoryRepository {
  constructor() {
    this.users = [...seed.users];
    this.questions = [...seed.questions];
    this.attempts = [...seed.attempts];
    this.userIdSeq = 1;
    this.attemptSeq = 1;
  }

  async createUser({ email, password, name }) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: this.userIdSeq++,
      email,
      passwordHash,
      name,
      xp: 0,
      level: 1,
      streak: 0,
      lastStudyDate: null,
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  async findUserByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findUserById(id) {
    return this.users.find((u) => u.id === id) || null;
  }

  async listLessonQuestions(lessonId) {
    return this.questions.filter((q) => q.lessonId === Number(lessonId));
  }

  async getQuestionById(questionId) {
    return this.questions.find((q) => q.id === questionId) || null;
  }

  async recordAttempt({ userId, questionId, selectedOption, correct, easeFactor, intervalDays, nextReviewAt, xpGained }) {
    const attempt = {
      id: this.attemptSeq++,
      userId,
      questionId,
      selectedOption,
      correct,
      easeFactor,
      intervalDays,
      nextReviewAt,
      xpGained,
      createdAt: new Date().toISOString()
    };
    this.attempts.push(attempt);
    return attempt;
  }

  async updateUserProgress({ userId, xpDelta, studyDate }) {
    const user = await this.findUserById(userId);
    if (!user) return null;
    user.xp += xpDelta;
    user.level = Math.floor(user.xp / 100) + 1;

    const today = new Date(studyDate).toISOString().slice(0, 10);
    const last = user.lastStudyDate ? new Date(user.lastStudyDate).toISOString().slice(0, 10) : null;
    if (!last) user.streak = 1;
    else {
      const diffDays = Math.floor((new Date(today) - new Date(last)) / 86400000);
      if (diffDays === 1) user.streak += 1;
      else if (diffDays > 1) user.streak = 1;
    }
    user.lastStudyDate = studyDate;
    return user;
  }

  async getUserStats(userId) {
    const user = await this.findUserById(userId);
    if (!user) return null;
    const attempts = this.attempts.filter((a) => a.userId === userId);
    const correct = attempts.filter((a) => a.correct).length;
    return {
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      totalAttempts: attempts.length,
      accuracy: attempts.length ? Number(((correct / attempts.length) * 100).toFixed(2)) : 0
    };
  }

  async getLeaderboard(limit = 10) {
    return [...this.users]
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit)
      .map((u, i) => ({ rank: i + 1, id: u.id, name: u.name, xp: u.xp, level: u.level }));
  }

  async getLastAttemptForQuestion(userId, questionId) {
    return [...this.attempts]
      .filter((a) => a.userId === userId && a.questionId === questionId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
  }
}

module.exports = { InMemoryRepository };
