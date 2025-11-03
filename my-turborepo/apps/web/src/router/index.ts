
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
      title: "Register",
      guest: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "Login",
       guest: true
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
    path: "/",
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
      {
        path: "/manager",
        name: "manager",
        component: () => import("@/pages/manager/manager.vue"),
        meta: {
          title: "Manager",
          manager: true,
          requiresAuth: true
        }
      },
      {
        path: "/customer",
        name: "customer",
        component: () => import("@/pages/manager/customer.vue"),
        meta: {
          title: "Customer",
          manager: true,
          requiresAuth: true
        }
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("@/pages/manager/orders.vue"),
        meta: {
          title: "Customers order",
          manager: true,
          requiresAuth: true
        }
      },
      {
        path: "/stocks",
        name: "stocks",
        component: () => import("@/pages/manager/stocks.vue"),
        meta: {
          title: "Stocks",
          manager: true,
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
  const requiresManager = to.matched.some(record => record.meta.manager)
  const guest = to.matched.some(record => record.meta.guest)


  console.log({auth: auth.isAuthenticated, guest:guest})

  if(!auth.isAuthenticated && requiresAuth){
    return {name: "login", query:{redirect: to.fullPath}}
  } 

  if(auth.user?.role === "manager" && to.name === "dashboard"){
      return {name: "manager", query:{forbbiden: to.fullPath}}
  }

  if(requiresManager && auth.user?.role !=="manager"){
      return {name: 'dashboard'}
  }

  if(auth.isAuthenticated && guest){
    if(auth.user?.role === "manager" && to.name === "dashboard"){
       return {name: "manager"}
    }

    return {name: "dashboard"}
  }


})

export default router