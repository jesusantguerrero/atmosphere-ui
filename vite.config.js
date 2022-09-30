import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import postcss from "./postcss.config.js";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    css: {
        postcss,
    },
    build: {
        lib: {
            entry: fileURLToPath(new URL("src/index.js", import.meta.url)),
            name: "atmosphere-ui",
        },
        rollupOptions: {
            external: [
                "vue",
                "@inertiajs/inertia-vue3",
                "@inertiajs/inertia",
                "@vueuse/core",
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    resolve: {
        alias: {
            "~/": fileURLToPath(new URL("./src", import.meta.url)),
            "~atoms": fileURLToPath(
                new URL("./src/components/atoms", import.meta.url)
            ),
            "~molecules": fileURLToPath(
                new URL("./src/components/molecules", import.meta.url)
            ),
            "~organisms": fileURLToPath(
                new URL("./src/components/organisms", import.meta.url)
            ),
            "~templates": fileURLToPath(
                new URL("./src/components/templates", import.meta.url)
            ),
            "~utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        },
    },
    test: {
        include: ["src/**/*.spec.*"],
        environment: "jsdom",
        globals: true,
    },
});
