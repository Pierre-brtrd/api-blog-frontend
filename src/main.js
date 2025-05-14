import '@/assets/styles/main.scss'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(head)

app.mount('#app')
