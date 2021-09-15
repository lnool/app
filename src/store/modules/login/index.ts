import { Module } from 'vuex'

import router, { setupRoutes } from '@/router'

import { accountLogin, getUserInfo, getMenu } from '@/api'

import { ILoginState, IRootState } from '../../interface'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {},
    menu: []
  }),
  mutations: {
    saveToken(state, token: string) {
      state.token = token
    },
    saveUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    saveMenu(state, menu: any) {
      state.menu = menu
      setupRoutes()
    }
  },
  actions: {
    async accountLogin({ commit }, payload: any) {
      const { id, token } = (await accountLogin(payload)).data
      commit('saveToken', token)

      const userInfo = (await getUserInfo(id)).data
      commit('saveUserInfo', userInfo)

      const menu = (await getMenu(userInfo.role.id)).data
      commit('saveMenu', menu)

      router.push('/main')
    }
    // phoneLogin({ commit }, payload: any) {
    //   console.log(payload)
    // }
  }
}

export default loginModule
