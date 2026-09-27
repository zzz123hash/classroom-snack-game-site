# Classroom Snack introduction

This standalone static page describes the game and displays a four-tier endless playtest score table. It does not embed the playable game. The primary button links to the verified [itch.io game page](https://knowhy.itch.io/classroom-snacks). The existing public playtest links remain separate. `classroom.png` is a game screenshot, not an interactive frame.

The page has no build step, runtime CDN, analytics, account or personal profile. `config.js` points to the verified HTTPS score Worker. It reads the table on open, tier change or return to the tab rather than polling every 30 seconds. When its API fails, the table shows an error instead of invented rows.

The production game area is `https://game.knowhy.net/`. Its header returns to the main Knowhy navigation page. The game itself remains on itch.io; the score table is a playtest board rather than a cheat-resistant competition ranking.

Serve this directory with a local static server to check 390px and desktop layout. The screenshot must retain its native 390:844 aspect ratio at every breakpoint; use `height:auto` with its responsive width. Do not publish the old `product-hub-cloudflare-pages.zip`; it contains the rejected generic page.

## Cloudflare Workers Static Assets

The independent GitHub repository `zzz123hash/classroom-snack-game-site` includes `wrangler.jsonc` and `.assetsignore`. From a clone of that repository, `npx wrangler deploy` uploads only `index.html`, `config.js` and `classroom.png` as Workers Static Assets. It needs no game bundle, framework or build command. The leaderboard API is an existing separate Worker. `wrangler.jsonc` binds the confirmed `game.knowhy.net` custom domain and explicitly keeps the earlier `workers.dev` URL available. The configuration is the source of truth for subsequent Wrangler deployments. If the custom domain needs to be rolled back, remove its `routes` entry and redeploy; verify the remaining URL before changing the navigation card.
