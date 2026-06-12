import { defineConfig } from "vite";

/** GitHub Pages project site uses /f22-raptor/. In GitHub Actions, GITHUB_ACTIONS is set. */
const base = process.env.GITHUB_ACTIONS === "true" ? "/f22-raptor/" : "/";

export default defineConfig({
  base,
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
    },
  },
});
