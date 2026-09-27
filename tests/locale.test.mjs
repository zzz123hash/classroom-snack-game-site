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

test('saved language wins; browser language and unknown values fall back predictably', () => {
  assert.equal(resolveLocale('de', 'zh-CN'), 'de');
  assert.equal(resolveLocale(null, 'pt-PT'), 'pt-BR');
  assert.equal(resolveLocale(null, 'zh-TW'), 'zh-CN');
  assert.equal(resolveLocale(null, 'it-IT'), 'en');
  assert.equal(resolveLocale('bad-value', 'ja-JP'), 'ja');
});

test('dynamic leaderboard status is translated without changing player data', () => {
  assert.equal(translate('en', 'boardCount', { count: 7 }), '7 players ranked');
  assert.equal(translate('zh-CN', 'boardCount', { count: 7 }), '当前已上榜 7 位');
  assert.equal(translate('unknown', 'boardCount', { count: 7 }), '7 players ranked');
});

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

test('both public pages bind their visible copy to known translation keys', () => {
  const root = dirname(fileURLToPath(import.meta.url));
  const pages = [join(root, '..', 'index.html'), join(root, '..', 'classroom-snacks', 'index.html')];
  const keys = pages.flatMap((path) => [...readFileSync(path, 'utf8').matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)].map((match) => match[1]));
  assert.ok(keys.length >= 55, `only ${keys.length} localized bindings`);
  for (const key of keys) assert.ok(translations.en[key], `unknown page key: ${key}`);
});
