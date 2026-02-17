// Comentário: Serviço de autenticação com registro, login e geração de JWT.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config');

class AuthService {
  constructor(repository) {
    this.repository = repository;
  }

  async register({ name, email, password }) {
    const existing = await this.repository.findUserByEmail(email);
    if (existing) throw new Error('EMAIL_ALREADY_IN_USE');
    const user = await this.repository.createUser({ name, email, password });
    return this._tokenize(user);
  }

  async login({ email, password }) {
    const user = await this.repository.findUserByEmail(email);
    if (!user) throw new Error('INVALID_CREDENTIALS');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('INVALID_CREDENTIALS');
    return this._tokenize(user);
  }

  _tokenize(user) {
    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: jwtExpiresIn });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        level: user.level,
        streak: user.streak
      }
    };
  }
}

module.exports = { AuthService };
