/**
 * Pure rules for `scripts/prerender.mjs`: which pages get their own HTML file,
 * what each one's link-preview tags say, and the sitemap.
 *
 * Why: the site is a single-page app, so without this every URL is served the
 * same index.html — link previews (LinkedIn, Slack) show the home page's title
 * and image, and GitHub Pages answers deep links with an HTTP 404.
 */

const SUFFIX = "Alec Stanley";
const HOME_TITLE = `${SUFFIX} — technical portfolio`;
const OG_W = 1200;
const OG_H = 630;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Replace exactly one match of `re` (which captures the text before and after
 *  the value) or fail, so a reworded index.html can't silently ship stale tags. */
function replaceOne(html, re, value, name) {
  const matches = html.match(new RegExp(re.source, "g")) || [];
  if (matches.length !== 1) throw new Error(`index.html: expected one ${name} tag, found ${matches.length}`);
  return html.replace(re, (_, before, after) => `${before}${value}${after}`);
}

const metaTag = (attr, key) => new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);

/** index.html with this page's title, description, preview tags and canonical URL. */
export function renderHead(html, { title, description, url, image, card }) {
  let out = html;
  out = replaceOne(out, /(<title>)[^<]*(<\/title>)/, esc(title), "title");
  out = replaceOne(out, metaTag("name", "description"), esc(description), "description");
  out = replaceOne(out, metaTag("property", "og:url"), esc(url), "og:url");
  out = replaceOne(out, metaTag("property", "og:title"), esc(title), "og:title");
  out = replaceOne(out, metaTag("property", "og:description"), esc(description), "og:description");
  out = replaceOne(out, metaTag("property", "og:image"), esc(image.url), "og:image");
  out = replaceOne(out, metaTag("property", "og:image:width"), String(image.width), "og:image:width");
  out = replaceOne(out, metaTag("property", "og:image:height"), String(image.height), "og:image:height");
  out = replaceOne(out, metaTag("property", "og:image:alt"), esc(image.alt), "og:image:alt");
  out = replaceOne(out, metaTag("name", "twitter:card"), card, "twitter:card");
  out = replaceOne(out, metaTag("name", "twitter:image"), esc(image.url), "twitter:image");
  out = replaceOne(out, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, esc(url), "canonical");
  return out;
}

/** Every page that gets its own HTML file, with its preview metadata. */
export function routes({ projects, covers, siteMeta, origin }) {
  const portrait = { url: `${origin}/og-image.jpg`, width: 800, height: 800, alt: SUFFIX };
  const page = (path, title, description, image = portrait) => ({
    path,
    meta: {
      title,
      description,
      url: `${origin}${path}`,
      image,
      card: image === portrait ? "summary" : "summary_large_image",
    },
  });

  return [
    page("/", HOME_TITLE, siteMeta.home),
    page("/work/", `Work · ${SUFFIX}`, siteMeta.work),
    page("/about/", `About · ${SUFFIX}`, siteMeta.about),
    page("/contact/", `Contact · ${SUFFIX}`, siteMeta.contact),
    ...projects.map((p) => {
      const og = covers[p.slug]?.og;
      const image = og ? { url: `${origin}/${og.path}`, width: og.w, height: og.h, alt: p.title } : portrait;
      return page(`/work/${p.slug}/`, `${p.title} · ${SUFFIX}`, p.summary, image);
    }),
  ];
}

/** The largest centred crop of a w×h image with the 1200×630 preview shape. */
export function ogCrop(w, h) {
  const ratio = OG_W / OG_H;
  return w / h > ratio ? { w: Math.round(h * ratio), h } : { w, h: Math.round(w / ratio) };
}

export const OG_SIZE = { w: OG_W, h: OG_H };

export function sitemap(urls) {
  const body = urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function robots(origin) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
}
