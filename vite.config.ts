import { defineConfig } from "vite"
import AutoImport from "unplugin-auto-import/vite"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"

const pathSrc = resolve(__dirname, "src")

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(), // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: "Icon",
                }),
            ],
            dts: "auto-imports.d.ts",
        }),
        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ["ep"],
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],
            dts: "components.d.ts",
        }),
        Icons({
            autoInstall: true,
        }),
    ],
    resolve: {
        alias: {
            "@": pathSrc,
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
