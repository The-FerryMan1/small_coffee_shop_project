import './assets/main.css'
import '@/axios/interceptor'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ui from "@nuxt/ui/vue-plugin"
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'





(async ()=>{
    const app = createApp(App)
app.use(createPinia())


const auth = useAuthStore()
try {
    console.log("Attempting to re-establish user session...")
    await auth.getUser()
    console.log("User session established successfully.")
} catch (error) {
    console.error("Failed to load user session on startup. Continuing application mount...", error)
}

app.use(router)




app.use(ui)


router.isReady().then(() => {
    app.mount('#app')
})
})();


