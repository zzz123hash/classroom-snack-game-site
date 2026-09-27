import { t, onLocaleChange } from './site-i18n.js';

const button = document.getElementById('daynight');
function renderTheme() {
  if (!button) return;
  const key = document.body.classList.contains('night') ? 'themeNight' : 'themeDay';
  button.textContent = document.body.classList.contains('night') ? '☾' : '☀';
  button.setAttribute('aria-label', t(key));
  button.title = t(key);
}
button?.addEventListener('click', () => {
  const night = document.body.classList.toggle('night');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', night ? '#161e2e' : '#f4efe3');
  renderTheme();
});
onLocaleChange(renderTheme);
renderTheme();
