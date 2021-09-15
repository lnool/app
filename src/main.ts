import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'

import '@/base-ui/breadcrumb'
import router, { setupRoutes } from './router'
import store from './store'

const app = createApp(App)

setupRoutes()

app.use(router)
app.use(store)
app.use(globalRegister)

app.mount('#app')
