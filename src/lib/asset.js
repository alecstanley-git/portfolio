/** Resolve a file in `public/` against the deployment base path, so the site
 *  works both at the domain root and under a GitHub Pages project sub-path.
 *
 *  Falls back to "/" outside Vite (`import.meta.env` is undefined under plain
 *  Node), so `scripts/import-assets.mjs` can import the content module directly. */
export function asset(path) {
  const base = import.meta.env?.BASE_URL ?? "/";
  return `${base}${String(path).replace(/^\//, "")}`;
}
