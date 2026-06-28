import { defineConfig } from "vite";
import path from "path";

/**
 * Dedicated build for the public website ("site" entry only).
 *
 * Decoupled from the main vite.config.js so the static GitHub Pages build does
 * not pull in the boilerplate's app/sprig bundles (and their dependencies).
 * Outputs to web/dist-site/ with a manifest that tools/render.php reads to
 * inject the hashed CSS/JS into the static HTML.
 */
export default defineConfig({
    build: {
        manifest: true,
        outDir: path.resolve(__dirname, "web/dist-site/"),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                site: path.resolve(__dirname, "src/js/site.js"),
            },
        },
    },
    publicDir: path.resolve(__dirname, "src/public"),
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@css": path.resolve(__dirname, "src/scss"),
            "@js": path.resolve(__dirname, "src/js"),
        },
    },
});
