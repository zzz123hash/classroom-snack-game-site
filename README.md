# KNOWHY GAMES site

This static, multi-game catalog is adapted from [Formwork Isometria](https://github.com/shellcat-com/formwork-isometria) under its MIT license (`LICENSE`). The island layout, responsive grid, color-token system and optional desktop Three.js scene come from that template. All studio copy, the Classroom Snacks listing and the detail page are project-specific. `vendor/three.module.js` is Three.js 0.160.0, with its own MIT notice in `vendor/THREE-LICENSE.txt`.

The site needs no build step, account, analytics, contact form or CDN. The local Three.js module is loaded only on wide screens when reduced motion is not requested. A static layout remains usable without WebGL or JavaScript. The game is not embedded; the playable link opens the verified itch.io listing.

`/` is the catalog. `/classroom-snacks/` is the game's detail page and read-only endless playtest board. The board loads from the existing score Worker configured in `config.js`; empty and unavailable states retain five blank rank slots. Future games can be added as real cards and detail pages without placeholder releases.

For local review: `python -m http.server 5199 --bind 127.0.0.1`, then open `http://127.0.0.1:5199/`. Before publishing, inspect both routes at 390×844 and desktop widths, verify the itch.io links, empty board behavior and network console. `wrangler.jsonc` targets the existing `game.knowhy.net` Cloudflare Worker; deploying does not modify DNS or the separate score Worker.
