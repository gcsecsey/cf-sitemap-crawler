import cheerio from 'cheerio';
import sites from './sitesToCrawl.json';

const KV_KEY = 'links';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 * @returns {Response.text} link tree in siteMapUrl -> links[] format
 */
async function handleRequest(request) {
  const kv = JSON.parse(await KV.get(KV_KEY)) || {};

  const siteMaps = [];
  for (const site of sites) {
    siteMaps.push(...(await getLinks(site + 'wp-sitemap.xml', true)));
  }

  for (const sitemap of siteMaps) {
    kv[sitemap] = await getLinks(sitemap);
  }

  const result = JSON.stringify(kv);

  await KV.put(KV_KEY, result);

  return new Response(result, {
    headers: { 'content-type': 'application/json' },
  });
}

async function getLinks(url, onlySiteMapUrls = false) {
  const options = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  };
  const response = await fetch(url, options);
  const result = await response.text();

  const $ = cheerio.load(result);
  const linkObjects = $('loc');

  const _links = [];
  linkObjects.each((index, element) => {
    const linkText = $(element).text();
    if (onlySiteMapUrls && linkText.endsWith('.xml')) {
      _links.push(linkText);
    } else {
      _links.push(linkText);
    }
  });
  return _links;
}
