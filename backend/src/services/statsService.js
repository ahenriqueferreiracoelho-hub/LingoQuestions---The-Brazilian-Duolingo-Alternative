// Comentário: Serviço para estatísticas e ranking.
class StatsService {
  constructor(repository) {
    this.repository = repository;
  }

  async getUserStats(userId) {
    return this.repository.getUserStats(userId);
  }

  async getLeaderboard(limit = 10) {
    return this.repository.getLeaderboard(limit);
  }
}

module.exports = { StatsService };
