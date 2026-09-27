import { t, onLocaleChange } from './site-i18n.js';

const endpoint = String(window.CLASSROOM_SCORE_API || '').replace(/\/$/, '');
const tabs = [...document.querySelectorAll('[data-tier]')];
const status = document.getElementById('status');
const scores = document.getElementById('scores');
let tier = 'normal';
let requestId = 0;
let statusKey = 'boardLoading';
let statusParams = {};

function setStatus(key, state, params = {}) {
  statusKey = key;
  statusParams = params;
  status.dataset.state = state;
  status.textContent = t(key, params);
}

function renderPlaceholderRows() {
  scores.replaceChildren();
  for (let rank = 1; rank <= 5; rank += 1) {
    const row = document.createElement('tr');
    row.className = 'placeholder-row';
    [String(rank).padStart(2, '0'), '—', '—'].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });
    scores.append(row);
  }
}

async function loadScores() {
  const id = ++requestId;
  renderPlaceholderRows();
  setStatus('boardLoading', 'loading');
  if (!endpoint) {
    setStatus('boardOffline', 'error');
    return;
  }
  try {
    const response = await fetch(`${endpoint}/v1/leaderboard?difficulty=${tier}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('unavailable');
    const data = await response.json();
    if (id !== requestId) return;
    if (!Array.isArray(data.rows)) throw new Error('invalid response');
    if (data.rows.length === 0) {
      setStatus('boardEmpty', 'empty');
      return;
    }
    scores.replaceChildren();
    data.rows.slice(0, 20).forEach((entry, index) => {
      const row = document.createElement('tr');
      [String(index + 1).padStart(2, '0'), String(entry.displayName || '—'), String(entry.score)].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      scores.append(row);
    });
    setStatus('boardCount', 'ready', { count: data.rows.length });
  } catch {
    if (id !== requestId) return;
    setStatus('boardError', 'error');
  }
}

tabs.forEach((tab) => tab.addEventListener('click', () => {
  tier = tab.dataset.tier;
  tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  loadScores();
}));
onLocaleChange(() => { status.textContent = t(statusKey, statusParams); });
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) loadScores();
});
loadScores();
