import test from 'node:test';
import assert from 'node:assert/strict';
import { SUPPORTED_LOCALES, translations, resolveLocale, translate } from '../locale.js';

test('the site has the same eight complete locale catalogs as the game', () => {
  assert.deepEqual(SUPPORTED_LOCALES, ['zh-CN', 'en', 'ja', 'ko', 'es', 'pt-BR', 'fr', 'de']);
  const englishKeys = Object.keys(translations.en).sort();
  assert.ok(englishKeys.length >= 45);
  for (const locale of SUPPORTED_LOCALES) {
    assert.deepEqual(Object.keys(translations[locale]).sort(), englishKeys, locale);
    for (const key of englishKeys) assert.ok(translations[locale][key].trim(), `${locale}:${key}`);
    assert.match(translations[locale].boardCount, /\{count\}/, locale);
  }
});

test('saved language wins; a first visit always starts in English', () => {
  assert.equal(resolveLocale('de', 'zh-CN'), 'de');
  assert.equal(resolveLocale(null, 'pt-PT'), 'en');
  assert.equal(resolveLocale(null, 'zh-TW'), 'en');
  assert.equal(resolveLocale(null, 'it-IT'), 'en');
  assert.equal(resolveLocale('bad-value', 'ja-JP'), 'en');
});

test('catalog copy translates without losing the English fallback', () => {
  assert.equal(translate('en', 'gamesTitle'), 'Explore the collection');
  assert.equal(translate('unknown', 'gamesTitle'), 'Explore the collection');
  assert.equal(translate('zh-CN', 'gamesTitle'), '探索游戏目录');
});

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

test('both public pages bind their visible copy to known translation keys', () => {
  const root = dirname(fileURLToPath(import.meta.url));
  const pages = [join(root, '..', 'index.html'), join(root, '..', 'classroom-snacks', 'index.html')];
  const keys = pages.flatMap((path) => [...readFileSync(path, 'utf8').matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)].map((match) => match[1]));
  assert.ok(keys.length >= 50, `only ${keys.length} localized bindings`);
  for (const key of keys) assert.ok(translations.en[key], `unknown page key: ${key}`);
});

test('catalog promotes discovery, not the game scoreboard', () => {
  const root = dirname(fileURLToPath(import.meta.url));
  const home = readFileSync(join(root, '..', 'index.html'), 'utf8');
  const detail = readFileSync(join(root, '..', 'classroom-snacks', 'index.html'), 'utf8');
  for (const page of [home, detail]) {
    assert.match(page, /<span class="language-label">Language<\/span>/);
    assert.doesNotMatch(page, /leaderboard\.js|id="leaderboard"|href="#leaderboard"/);
  }
  assert.doesNotMatch(home, /class="hero-art"|class="game game-feature"/);
  assert.match(home, /class="game-card"/);
});
