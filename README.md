# Cloudflare Sitemap Crawler Worker

This is a simple worker to crawl and save links from sitemaps.

The gathered links are saved to KV storage, and returned in the response.

## How do I set this up?

That's simple!

Just set your account info in `wrangler.toml` and deploy to Cloudflare Workers.

## Crawling sitemap

Add the site url you'd like to crawl to the [sitesToCrawl.json](/sitesToCrawl.json) file

Run `yarn dev` to start the worker in a preview environment.

Visit the preview url, the response should contain a link tree in the following format:

```
{
    "sitemapUrl1": [
        "link1",
        "link2",
        "link3"
    ],
    "sitemapUrl2": [
        "link1",
        "link2",
        "link3"
    ],
    {...}
}
```
