// Comentário: Implementação simplificada de repetição espaçada inspirada no SM-2.
function computeNextReview({ currentEase = 2.5, currentInterval = 1, correct }) {
  if (!correct) {
    return {
      easeFactor: Math.max(1.3, currentEase - 0.2),
      intervalDays: 1
    };
  }

  const easeFactor = Math.min(3.0, currentEase + 0.1);
  const intervalDays = Math.round(Math.max(1, currentInterval * easeFactor));

  return { easeFactor, intervalDays };
}

module.exports = { computeNextReview };
