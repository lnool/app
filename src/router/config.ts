import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumbs } from '@/base-ui/breadcrumb'

let fistRoute: any = null

const loadRoute = (menu: any[]): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = []

  // 默认加载所有的路由规则
  const allRoutes: RouteRecordRaw[] = []
  const routeFile = require.context('./main', true, /\.ts/)
  routeFile.keys().forEach((key) => {
    const route = require('./main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 根据菜单获取需要添加的routes
  const _ = (menu: any[]) => {
    for (const item of menu) {
      if (item.type === 2) {
        const route = allRoutes.find((route) => route.path === item.url)
        if (route) {
          routes.push(route)
          if (!fistRoute) fistRoute = route
        }
      } else {
        _(item.children)
      }
    }
  }

  _(menu)

  return routes
}

const findRoute = (
  menu: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumbs[]
): any => {
  for (const item of menu) {
    if (item.type === 1) {
      const m = findRoute(item.children ?? [], currentPath)
      if (m) {
        breadcrumbs?.push({ name: item.name, path: item.url })
        breadcrumbs?.push({ name: m.name, path: m.url })
        return m
      }
    } else if (item.type === 2 && item.url === currentPath) {
      return item
    }
  }
}

const getBreadcrumbs = (menu: any[], currentPath: string): IBreadcrumbs[] => {
  const breadcrumbs: IBreadcrumbs[] = []
  findRoute(menu, currentPath, breadcrumbs)
  return breadcrumbs
}

/**
 * 获取菜单权限
 * @param menus
 * @returns
 */
const menuPermissions = (menus: any[]) => {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const item of menus) {
      if (item.type === 2 || item.type === 1) {
        _recurseGetPermission(item.children ?? [])
      } else if (item.type === 3) {
        permissions.push(item.permission)
      }
    }
  }
  _recurseGetPermission(menus)

  return permissions
}

export { fistRoute, loadRoute, findRoute, getBreadcrumbs, menuPermissions }
