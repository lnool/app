import http from '../config'

enum LoginAPI {
  ACCOUNT_LOGIN = '/login',
  LOGIN_USER = '/users/',
  ROLE_MENU = '/role'
}

export const accountLogin = (data: unknown): any =>
  http.post({
    url: LoginAPI.ACCOUNT_LOGIN,
    data
  })

export const phoneLogin = (data: unknown): any =>
  http.post({
    url: LoginAPI.ACCOUNT_LOGIN,
    data
  })

export const getUserInfo = (id: number): any =>
  http.get({
    url: LoginAPI.LOGIN_USER + id,
    showLoading: false
  })

export const getMenu = (role: number): any =>
  http.get({
    url: `${LoginAPI.ROLE_MENU}/${role}/menu`,
    showLoading: false
  })
