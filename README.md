# Classroom Snack introduction

This standalone static page describes the game and displays a four-tier endless playtest score table. It does not link to or embed the playable game. The existing public playtest links remain separate. `classroom.png` is a game screenshot, not an interactive frame.

The page has no build step, runtime CDN, analytics, account or personal profile. `config.js` points to the verified HTTPS score Worker. When its API fails, the table shows an error instead of invented rows.

Serve this directory with a local static server to check 390px and desktop layout. Do not publish the old `product-hub-cloudflare-pages.zip`; it contains the rejected generic page.
