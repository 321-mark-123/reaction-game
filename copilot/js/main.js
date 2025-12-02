


import { initScene, setVisualState } from './three-scene.js';
import { startGame, registerClick } from './game-logic.js';
import { loadStats, updateStats, getAverage } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initScene();

  const startBtn = document.getElementById('start-btn');
  const statusEl = document.getElementById('status');
  const resultEl = document.getElementById('result');
  const statsEl = document.getElementById('stats');

  const sounds = {
    start: new Audio('assets/sounds/start.mp3'),
    success: new Audio('assets/sounds/success.mp3'),
    foul: new Audio('assets/sounds/foul.mp3')
  };

  function renderStats(stats) {
    statsEl.textContent = `Best: ${stats.best || '--'} ms | Avg: ${getAverage(stats.attempts)} ms`;
  }

  renderStats(loadStats());

  startBtn.addEventListener('click', () => {
    sounds.start.play();
    statusEl.textContent = 'Wait for green...';
    setVisualState('waiting');
    startGame(() => {
      statusEl.textContent = 'CLICK NOW!';
      setVisualState('ready');
    }, () => {
      sounds.foul.play();
      statusEl.textContent = 'Too early! Try again.';
      setVisualState('foul');
    });
  });

  document.getElementById('three-canvas').addEventListener('click', () => {
    registerClick((reactionTime) => {
      sounds.success.play();
      resultEl.textContent = `Reaction Time: ${reactionTime.toFixed(0)} ms`;
      const stats = updateStats(reactionTime);
      renderStats(stats);
      statusEl.textContent = 'Press Start to play again';
      setVisualState('waiting');
    }, () => {
      sounds.foul.play();
      statusEl.textContent = 'Too early! Try again.';
      setVisualState('foul');
    });
  });
});
