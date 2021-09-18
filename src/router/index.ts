import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { fistRoute, loadRoute, menuPermissions } from './config'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

const state = store.state

router.beforeEach((to) => {
  if (to.path !== '/login') if (!state.login.token) return '/login'
  if (to.path === '/main') return fistRoute.path
})

export const setupRoutes = (): string[] => {
  const menu = state.login?.menu
  if (menu) {
    const routes = loadRoute(menu)
    routes.forEach((route) => router.addRoute('main', route))
    return menuPermissions(menu)
  }
  return []
}

export default router
