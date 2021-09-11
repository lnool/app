import { createApp } from 'vue'

import { globalRegister } from './global'
import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(globalRegister)

app.mount('#app')
