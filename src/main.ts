import { createApp } from "vue"
import { LoadingPlugin } from "vue-loading-overlay"
import "vue-loading-overlay/dist/css/index.css"
import "./style.css"
import App from "./App.vue"

const app = createApp(App)
app.use(LoadingPlugin)
app.mount("#app")
