# KNOWHY GAMES catalog

This static game catalog is adapted from [Formwork Isometria](https://github.com/shellcat-com/formwork-isometria) under its MIT license (`LICENSE`). The current homepage retains its simple card and responsive layout, but uses the original Classroom Snacks key art instead of the generic Three.js island. The older licensed Three.js files remain in `vendor/` for source provenance and are excluded from static deployment assets.

`/` introduces the studio's games. `/classroom-snacks/` describes Classroom Snacks, links to [itch.io](https://knowhy.itch.io/classroom-snacks), and shows a read-only endless playtest board. Gameplay is not embedded. The board reads from the existing score Worker configured in `config.js`; empty and unavailable states keep five blank ranks.

Both routes support Simplified Chinese, English, Japanese, Korean, Spanish, Brazilian Portuguese, French, and German. The shared language picker persists an explicit choice in localStorage; without one, it follows the browser language and falls back to English. HTML keeps readable Chinese copy when JavaScript is unavailable. Dynamic board status, page metadata, alt text, and accessible labels use the same locale catalog.

No build system, CDN, account, analytics, or contact form is required. For local review, run `python -m http.server 5199 --bind 127.0.0.1 --directory site/game-template-candidate` from the game repository, then open `http://127.0.0.1:5199/`. Run `node --test site/game-template-candidate/tests/locale.test.mjs` for catalog checks. Review both routes at narrow and desktop widths before publication. `wrangler.jsonc` targets the existing Cloudflare custom domain; local edits do not update the public site.
