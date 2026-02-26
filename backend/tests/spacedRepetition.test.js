// Comentário: Teste unitário da regra de repetição espaçada.
const { computeNextReview } = require('../src/utils/spacedRepetition');

describe('computeNextReview', () => {
  test('deve aumentar intervalo em acerto', () => {
    const result = computeNextReview({ currentEase: 2.5, currentInterval: 2, correct: true });
    expect(result.intervalDays).toBeGreaterThan(2);
  });

  test('deve reiniciar intervalo em erro', () => {
    const result = computeNextReview({ currentEase: 2.5, currentInterval: 5, correct: false });
    expect(result.intervalDays).toBe(1);
  });
});
