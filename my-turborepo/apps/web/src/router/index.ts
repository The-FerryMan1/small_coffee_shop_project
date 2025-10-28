import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'


const routes:RouteRecordRaw[] = [
    {
      path: "/",
      name: "home",
      component: ()=>import("@/pages/index.vue"),
      meta: {
        title: "Home"
      }
    },
     {
      path: "/register",
      name: "register",
      component: ()=>import("@/pages/register.vue"),
      meta: {
        title: "Register"
      }
    },
     {
      path: "/login",
      name: "login",
      component: ()=>import("@/pages/login.vue"),
      meta: {
        title: "Login"
      }
    },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((from, to)=>{
  document.title = `Coffeeshhh - ${from.meta.title}`
})

export default router
