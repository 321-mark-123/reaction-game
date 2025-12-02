

function loadStats() {
  return JSON.parse(localStorage.getItem('reactionStats')) || { attempts: [], best: null };
}

function saveStats(stats) {
  localStorage.setItem('reactionStats', JSON.stringify(stats));
}

function updateStats(reactionTime) {
  const stats = loadStats();
  stats.attempts.push(reactionTime);
  if (stats.attempts.length > 10) stats.attempts.shift();
  stats.best = stats.best ? Math.min(stats.best, reactionTime) : reactionTime;
  saveStats(stats);
  return stats;
}

function getAverage(attempts) {
  return attempts.length ? (attempts.reduce((a, b) => a + b, 0) / attempts.length).toFixed(0) : '--';
}

export { loadStats, updateStats, getAverage };
