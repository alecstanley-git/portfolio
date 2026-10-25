import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { ogCrop, renderHead, robots, routes, sitemap } from "../scripts/lib/prerender-rules.mjs";

const template = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

const meta = {
  title: "Gas Turbine & <Efficiency> · Alec Stanley",
  description: 'Thrust "rose" from 22 to 41 N.',
  url: "https://alecstanley.com/work/p-020/",
  image: { url: "https://alecstanley.com/media/p-020/og.jpg", width: 1200, height: 630, alt: "Gas Turbine" },
  card: "summary_large_image",
};

test("renderHead rewrites title, description, og/twitter tags and canonical", () => {
  const html = renderHead(template, meta);
  assert.match(html, /<title>Gas Turbine &amp; &lt;Efficiency&gt; · Alec Stanley<\/title>/);
  assert.match(html, /name="description"\s+content="Thrust &quot;rose&quot; from 22 to 41 N\."/);
  assert.match(html, /property="og:title" content="Gas Turbine &amp; &lt;Efficiency&gt; · Alec Stanley"/);
  assert.match(html, /property="og:description"\s+content="Thrust &quot;rose&quot;/);
  assert.match(html, /property="og:url" content="https:\/\/alecstanley.com\/work\/p-020\/"/);
  assert.match(html, /property="og:image" content="https:\/\/alecstanley.com\/media\/p-020\/og.jpg"/);
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  assert.match(html, /property="og:image:alt" content="Gas Turbine"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="twitter:image" content="https:\/\/alecstanley.com\/media\/p-020\/og.jpg"/);
  assert.match(html, /rel="canonical" href="https:\/\/alecstanley.com\/work\/p-020\/"/);
  assert.doesNotMatch(html, /technical portfolio<\/title>/);
});

test("renderHead fails loudly if index.html loses a tag it rewrites", () => {
  assert.throws(() => renderHead(template.replace(/<link rel="canonical"[^>]*>/, ""), meta), /canonical/);
});

test("routes: home, three pages, every project; project previews use its og image", () => {
  const projects = [
    { slug: "p-002", title: "Two", summary: "Second." },
    { slug: "p-001", title: "One", summary: "First." },
  ];
  const covers = { "p-002": { og: { path: "media/p-002/og.jpg", w: 1200, h: 630 } } };
  const siteMeta = { home: "H", work: "W", about: "A", contact: "C" };
  const r = routes({ projects, covers, siteMeta, origin: "https://alecstanley.com" });
  assert.deepEqual(r.map((x) => x.path), ["/", "/work/", "/about/", "/contact/", "/work/p-002/", "/work/p-001/"]);
  const two = r.find((x) => x.path === "/work/p-002/").meta;
  assert.equal(two.title, "Two · Alec Stanley");
  assert.equal(two.description, "Second.");
  assert.equal(two.url, "https://alecstanley.com/work/p-002/");
  assert.equal(two.image.url, "https://alecstanley.com/media/p-002/og.jpg");
  assert.equal(two.card, "summary_large_image");
  // No og image yet: fall back to the site-wide portrait card.
  const one = r.find((x) => x.path === "/work/p-001/").meta;
  assert.equal(one.image.url, "https://alecstanley.com/og-image.jpg");
  assert.equal(one.card, "summary");
  assert.equal(r[0].meta.title, "Alec Stanley — technical portfolio");
  assert.equal(r[1].meta.title, "Work · Alec Stanley");
});

test("ogCrop: largest centred 1200x630-shaped crop", () => {
  assert.deepEqual(ogCrop(900, 1103), { w: 900, h: 473 }); // tall: trim height
  assert.deepEqual(ogCrop(900, 450), { w: 857, h: 450 }); // wide: trim width
  assert.deepEqual(ogCrop(1200, 630), { w: 1200, h: 630 });
});

test("sitemap lists every route as an absolute URL; robots points at it", () => {
  const xml = sitemap(["https://alecstanley.com/", "https://alecstanley.com/work/p-001/"]);
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
  assert.match(xml, /<loc>https:\/\/alecstanley.com\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/alecstanley.com\/work\/p-001\/<\/loc>/);
  assert.equal(robots("https://alecstanley.com"), "User-agent: *\nAllow: /\n\nSitemap: https://alecstanley.com/sitemap.xml\n");
});
