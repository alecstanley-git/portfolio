import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * `base` is the deployment sub-path.
 *   - domain root (custom domain, or <user>.github.io)  → "/"        (default)
 *   - GitHub Pages project site                         → "/<repo>/"
 *
 * The Pages workflow sets BASE_PATH automatically; set it by hand for one-off
 * builds: `BASE_PATH=/portfolio/ npm run build`.
 */
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
  server: { port: 5173, open: false },
  build: { outDir: "dist", sourcemap: false },
});
