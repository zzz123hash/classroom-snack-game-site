const endpoint = String(window.CLASSROOM_SCORE_API || '').replace(/\/$/, '');
const tabs = [...document.querySelectorAll('[data-tier]')];
const status = document.getElementById('status');
const scores = document.getElementById('scores');
let tier = 'normal';
let requestId = 0;

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
  status.dataset.state = 'loading';
  status.textContent = '正在读取榜单…';
  if (!endpoint) {
    status.dataset.state = 'error';
    status.textContent = '榜单服务尚未接通，名次席位暂时空着。';
    return;
  }
  try {
    const response = await fetch(`${endpoint}/v1/leaderboard?difficulty=${tier}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('unavailable');
    const data = await response.json();
    if (id !== requestId) return;
    if (!Array.isArray(data.rows)) throw new Error('invalid response');
    if (data.rows.length === 0) {
      status.dataset.state = 'empty';
      status.textContent = '暂无上榜成绩，前排席位等你来占。';
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
    status.dataset.state = 'ready';
    status.textContent = `当前已上榜 ${data.rows.length} 位`;
  } catch {
    if (id !== requestId) return;
    status.dataset.state = 'error';
    status.textContent = '暂时无法读取榜单，名次席位暂时空着。';
  }
}

tabs.forEach((tab) => tab.addEventListener('click', () => {
  tier = tab.dataset.tier;
  tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  loadScores();
}));
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) loadScores();
});
loadScores();
