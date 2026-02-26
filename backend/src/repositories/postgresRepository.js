// Comentário: Repositório PostgreSQL para ambiente de produção usando SQL explícito.
const bcrypt = require('bcryptjs');

class PostgresRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createUser({ email, password, name }) {
    const passwordHash = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (email, password_hash, name)
      VALUES ($1, $2, $3)
      RETURNING id, email, password_hash AS "passwordHash", name, xp, level, streak, last_study_date AS "lastStudyDate", created_at AS "createdAt"`;
    const { rows } = await this.pool.query(query, [email, passwordHash, name]);
    return rows[0];
  }

  async findUserByEmail(email) {
    const { rows } = await this.pool.query(
      'SELECT id, email, password_hash AS "passwordHash", name, xp, level, streak, last_study_date AS "lastStudyDate", created_at AS "createdAt" FROM users WHERE LOWER(email)=LOWER($1)',
      [email]
    );
    return rows[0] || null;
  }

  async findUserById(id) {
    const { rows } = await this.pool.query(
      'SELECT id, email, password_hash AS "passwordHash", name, xp, level, streak, last_study_date AS "lastStudyDate", created_at AS "createdAt" FROM users WHERE id=$1',
      [id]
    );
    return rows[0] || null;
  }

  async listLessonQuestions(lessonId) {
    const { rows } = await this.pool.query(
      'SELECT id, lesson_id AS "lessonId", prompt, options, correct_option AS "correctOption", difficulty FROM questions WHERE lesson_id=$1',
      [lessonId]
    );
    return rows;
  }

  async getQuestionById(questionId) {
    const { rows } = await this.pool.query(
      'SELECT id, lesson_id AS "lessonId", prompt, options, correct_option AS "correctOption", difficulty FROM questions WHERE id=$1',
      [questionId]
    );
    return rows[0] || null;
  }

  async recordAttempt(payload) {
    const q = `INSERT INTO attempts (user_id, question_id, selected_option, correct, ease_factor, interval_days, next_review_at, xp_gained)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id,user_id AS "userId",question_id AS "questionId",selected_option AS "selectedOption",correct,ease_factor AS "easeFactor",interval_days AS "intervalDays",next_review_at AS "nextReviewAt",xp_gained AS "xpGained",created_at AS "createdAt"`;
    const v = [payload.userId, payload.questionId, payload.selectedOption, payload.correct, payload.easeFactor, payload.intervalDays, payload.nextReviewAt, payload.xpGained];
    const { rows } = await this.pool.query(q, v);
    return rows[0];
  }

  async updateUserProgress({ userId, xpDelta, studyDate }) {
    const q = `UPDATE users
      SET xp = xp + $2,
          level = FLOOR((xp + $2) / 100) + 1,
          streak = CASE
            WHEN last_study_date IS NULL THEN 1
            WHEN DATE($3) - DATE(last_study_date) = 1 THEN streak + 1
            WHEN DATE($3) = DATE(last_study_date) THEN streak
            ELSE 1
          END,
          last_study_date = $3
      WHERE id = $1
      RETURNING id, email, password_hash AS "passwordHash", name, xp, level, streak, last_study_date AS "lastStudyDate", created_at AS "createdAt"`;
    const { rows } = await this.pool.query(q, [userId, xpDelta, studyDate]);
    return rows[0] || null;
  }

  async getUserStats(userId) {
    const q = `SELECT u.xp, u.level, u.streak,
      COUNT(a.id)::int AS "totalAttempts",
      COALESCE(ROUND((SUM(CASE WHEN a.correct THEN 1 ELSE 0 END)::numeric / NULLIF(COUNT(a.id),0)) * 100, 2),0) AS accuracy
      FROM users u LEFT JOIN attempts a ON a.user_id = u.id
      WHERE u.id = $1 GROUP BY u.id`;
    const { rows } = await this.pool.query(q, [userId]);
    return rows[0] || null;
  }

  async getLeaderboard(limit = 10) {
    const { rows } = await this.pool.query(
      'SELECT id, name, xp, level FROM users ORDER BY xp DESC LIMIT $1',
      [limit]
    );
    return rows.map((r, i) => ({ rank: i + 1, ...r }));
  }

  async getLastAttemptForQuestion(userId, questionId) {
    const { rows } = await this.pool.query(
      'SELECT id,user_id AS "userId",question_id AS "questionId",selected_option AS "selectedOption",correct,ease_factor AS "easeFactor",interval_days AS "intervalDays",next_review_at AS "nextReviewAt",xp_gained AS "xpGained",created_at AS "createdAt" FROM attempts WHERE user_id=$1 AND question_id=$2 ORDER BY created_at DESC LIMIT 1',
      [userId, questionId]
    );
    return rows[0] || null;
  }
}

module.exports = { PostgresRepository };
