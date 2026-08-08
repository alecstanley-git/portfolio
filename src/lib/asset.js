/** Resolve a file in `public/` against the deployment base path, so the site
 *  works both at the domain root and under a GitHub Pages project sub-path. */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, "")}`;
}
