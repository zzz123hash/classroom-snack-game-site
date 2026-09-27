import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { translations } from '../locale.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const relativePath of ['index.html', 'classroom-snacks/index.html']) {
  const path = join(root, relativePath);
  const source = readFileSync(path, 'utf8');
  const output = source.replace(/(<([a-z][\w-]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/gi, (match, opening, tag, key, current, closing) => {
    const value = translations.en[key];
    if (!value) throw new Error(`Missing English catalog key: ${key}`);
    return opening + escapeHtml(value) + closing;
  });
  writeFileSync(path, output);
}
