

let startTime, timeoutId;
let gameState = 'idle';

function startGame(onReady, onFoul) {
  gameState = 'waiting';
  const delay = Math.random() * 2000 + 1500; // 1.5–3.5s
  timeoutId = setTimeout(() => {
    gameState = 'ready';
    startTime = performance.now();
    onReady();
  }, delay);
}

function registerClick(onSuccess, onFoul) {
  if (gameState === 'waiting') {
    clearTimeout(timeoutId);
    gameState = 'foul';
    onFoul();
  } else if (gameState === 'ready') {
    const reactionTime = performance.now() - startTime;
    gameState = 'idle';
    onSuccess(reactionTime);
  }
}

export { startGame, registerClick };
