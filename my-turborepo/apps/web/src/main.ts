import './assets/main.css'
import '@/axios/interceptor'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ui from "@nuxt/ui/vue-plugin"
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
const app = createApp(App)
app.use(createPinia())




app.use(router)

const auth = useAuthStore()
try {
    // Attempt to fetch the user (e.g., using a stored token/cookie)
    console.log("Attempting to re-establish user session...")
    await auth.getUser()
    console.log("User session established successfully.")
} catch (error) {
    // ⭐ CRITICAL FIX: If getUser() fails (e.g., bad token, network error), 
    // we log the error but allow the script to continue running.
    console.error("Failed to load user session on startup. Continuing application mount...", error)
    // You might want to explicitly call auth.logout() here to clear any residual data
    auth.logout(); 
} 


app.use(ui)


router.isReady().then(()=>{
    app.mount('#app')
})

