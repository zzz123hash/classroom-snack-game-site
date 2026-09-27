# Classroom Snack introduction

This standalone static page describes the game and displays a four-tier endless playtest score table. It does not embed the playable game. The primary button links to the verified [itch.io game page](https://knowhy.itch.io/classroom-snacks). The existing public playtest links remain separate. `classroom.png` is a game screenshot, not an interactive frame.

The page has no build step, runtime CDN, analytics, account or personal profile. `config.js` points to the verified HTTPS score Worker. When its API fails, the table shows an error instead of invented rows.

Serve this directory with a local static server to check 390px and desktop layout. The screenshot must retain its native 390:844 aspect ratio at every breakpoint; use `height:auto` with its responsive width. Do not publish the old `product-hub-cloudflare-pages.zip`; it contains the rejected generic page.

## Cloudflare Pages

This directory can be uploaded directly as a static Pages project or imported from the independent GitHub repository `zzz123hash/classroom-snack-game-site` with no framework, no build command and the repository root as the output directory. The leaderboard API is an existing separate Worker; do not configure a game runtime or game source in Pages. Bind a custom subdomain only after its exact owned DNS zone has been confirmed.
