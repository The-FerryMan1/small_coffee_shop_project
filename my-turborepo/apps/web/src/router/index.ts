import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// --- 1. Route Definitions ---
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
      guest: true // Guest-only route
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "Login",
       guest: true // Guest-only route
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
  // Authenticated Layout (Parent Route)
  {
    path: "/",
    component: () => import("@/layouts/authenticated.vue"),
    meta: {
      requiresAuth: true // All children inherit this
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/pages/auth/dashboard.vue"),
        meta: {
          title: "Dashboard",
        }
      },
      {
        path: "/order",
        name: "order",
        component: () => import("@/pages/auth/order.vue"),
        meta: {
          title: "Order",
        }
      },
      // Manager Routes
      {
        path: "/manager",
        name: "manager",
        component: () => import("@/pages/manager/manager.vue"),
        meta: {
          title: "Manager",
          manager: true, // Requires manager role
        }
      },
      {
        path: "/customer",
        name: "customer",
        component: () => import("@/pages/manager/customer.vue"),
        meta: {
          title: "Customer",
          manager: true, // Requires manager role
        }
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("@/pages/manager/orders.vue"),
        meta: {
          title: "Customers order",
          manager: true, // Requires manager role
        }
      },
      {
        path: "/stocks",
        name: "stocks",
        component: () => import("@/pages/manager/stocks.vue"),
        meta: {
          title: "Stocks",
          manager: true, // Requires manager role
        }
      },
    ]
  },
  // 404 Catch-all
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

// --- 2. Global Navigation Guard (beforeEach) ---
router.beforeEach((to, from) => {
  // Use the Pinia store instance
  const auth = useAuthStore()

  // Check if *any* matched record (including the parent layout) has these meta fields
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresManager = to.matched.some(record => record.meta.manager)
  const isGuestRoute = to.matched.some(record => record.meta.guest)

  // 1. Handle Protected Routes (requiresAuth)
  if (requiresAuth) {
    if (!auth.isAuthenticated) {
      // User is not logged in, redirect to login
      // NOTE: We rely on auth.isAuthenticated being correctly set by the getUser() call in main.ts
      return { name: 'login' }
    }

    // 2. Handle Role-Specific Access (requiresManager)
    if (requiresManager) {
      // Assuming role is stored as 'Manager' in auth.user.role
      if (auth.user?.role !== 'Manager') {
        // Logged in, but unauthorized role: redirect to dashboard
        return { name: 'dashboard' } 
      }
    }
    
    // Authenticated, meets role requirements, allow navigation
    return true
  }

  // 3. Handle Guest-Only Routes (login, register)
  if (isGuestRoute) {
    if (auth.isAuthenticated) {
      // Logged in user trying to access login/register: redirect to dashboard
      return { name: 'dashboard' }
    }
    // Not logged in, allow access to guest route
    return true
  }

  // 4. Default Case: Allow all public routes and routes that don't match the above checks
  return true
})

// --- 3. After Each Hook (Title Update) ---
router.afterEach((to, from) => {
    // Check if the route has a title meta property
    const finalTitle = to.meta.title ? `Coffeeshhh - ${to.meta.title}` : 'Coffeeshhh';
    document.title = finalTitle;
})


export default router
