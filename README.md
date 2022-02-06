# Cloudflare Sitemap Crawler Worker

This is a simple worker to crawl and save links from sitemaps.

The gathered links are saved to KV storage, and returned in the response.

## How do I set this up?

That's simple!

Just set your account info in `wrangler.toml` and deploy to Cloudflare Workers.
