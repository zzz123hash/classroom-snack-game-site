# KNOWHY GAMES static site

The root page is a small catalog for future games. `/classroom-snacks/` is the Classroom Snacks detail page. The detail links to the verified [itch.io page](https://knowhy.itch.io/classroom-snacks); this site never embeds gameplay.

The site has no build step, CDN, analytics, accounts, or placeholder games. `classroom.png` is a game screenshot. `style.css` is shared by the catalog and detail page. `leaderboard.js` reads the existing score Worker URL from `config.js`; it requests scores on load, difficulty selection, and return to the tab. The board always shows five visibly empty rank slots if there are no scores or the API fails, without inventing player data. Each tier can show up to 20 real rows.

Serve this directory using a static server and inspect `/` and `/classroom-snacks/` at narrow and desktop widths. The independent GitHub repository is `zzz123hash/classroom-snack-game-site`. `wrangler.jsonc` deploys Workers Static Assets to the existing `game.knowhy.net` custom domain. Deploying the site does not alter the separate leaderboard Worker, DNS, or playable game.
