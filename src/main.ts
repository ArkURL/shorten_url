import { createApp } from "vue"
import { LoadingPlugin } from "vue-loading-overlay"
import "vue-loading-overlay/dist/css/index.css"
import "./style.css"
import App from "./App.vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const app = createApp(App)
app.use(LoadingPlugin)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount("#app")
