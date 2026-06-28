import { defineConfig, loadEnv } from "vite";
import ViteRestart from 'vite-plugin-full-reload'
import Banner from "vite-plugin-banner";
import pkg from "./package.json";
import path from "path";
import ViteFaviconsPlugin from "vite-plugin-favicon2";
import critical from 'rollup-plugin-critical'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    
    let plugins = [
        ViteRestart(
        ['templates/**/*']
        ),
        Banner(
        `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
        ),
    ];

    if (env.GENERATE_FAVICON === 'true') {
        plugins = plugins.concat([
            ViteFaviconsPlugin({
                logo: path.resolve(__dirname, pkg.favicon),
                projectRoot: process.cwd(),
                inject: false,
                outputPath: "favicons",
                favicons: {
                appName: pkg.name,
                appDescription: pkg.description,
                developerName: pkg.author,
                developerURL: pkg.homepage,
                start_url: "/",
                background: pkg.background,
                theme_color: pkg.theme_color,
                },
            }),
        ]);
    }

    if (env.CRITICAL_CSS === 'true') {
        plugins = plugins.concat([
            critical({
                criticalUrl: 'http://localhost/',
                criticalBase: './web/dist/criticalcss/',
                criticalPages: [
                    { 
                        uri: '',
                        template: 'index'
                    }
                ],
                criticalConfig: {
                    extract: true,
                },
            }),
        ]);
    }

    return {
        base: command === "serve" ? "" : "/dist/",
        build: {
            manifest: true,
            outDir: path.resolve(__dirname, "web/dist/"),
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    app: path.resolve(__dirname, "src/js/app.js"),
                    sprig: path.resolve(__dirname, "src/js/sprig.js"),
                    site: path.resolve(__dirname, "src/js/site.js")
                },
            },
        },
        plugins: plugins,
        publicDir: path.resolve(__dirname, "src/public"),
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@css": path.resolve(__dirname, "src/scss"),
                "@js": path.resolve(__dirname, "src/js"),
            },
        },
        server: {
            host: "0.0.0.0",
            port: 3000,
            strictPort: true,
            origin: 'http://127.0.0.1:8080'
        }
    }
});
