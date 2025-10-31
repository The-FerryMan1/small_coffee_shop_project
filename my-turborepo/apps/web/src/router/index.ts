import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/index.vue"),
    meta: {
      title: "Home"
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/pages/register.vue"),
    meta: {
      title: "Register"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "Login"
    }
  },
  {
    path: "/coffee",
    name: "coffee",
    component: () => import("@/pages/coffee.vue"),
    meta: {
      title: "Coffee"
    }
  },
  {
    path: "/dashboard",
    component: () => import("@/layouts/authenticated.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/pages/auth/dashboard.vue"),
        meta: {
          title: "Dashboard",
          requiresAuth: true
        }
      },
      {
        path: "/order",
        name: "order",
        component: () => import("@/pages/auth/order.vue"),
        meta: {
          title: "Order",
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/error.vue"),
    meta: {
      title: "404"
    }

  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((from, to) => {
  document.title = `Coffeeshhh - ${from.meta.title}`
})

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!auth.isAuthenticated) {
    try {
      await auth.getUser()
    } catch (error) {
      return
    }

  }

  if (requiresAuth && !auth.isAuthenticated) {
    return { name: "login" }
  }

  if (to.name === "login" || to.name === "register" && auth.isAuthenticated) {
    return { name: "dashboard" }
  }

})

export default router
