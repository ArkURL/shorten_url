import { defineConfig } from "vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "https://cleanuri.com",
                changeOrigin: true,
                rewrite(path) {
                    return path
                },
            },
        },
    },
})
