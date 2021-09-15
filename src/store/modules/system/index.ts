import { Module } from 'vuex'

import { IRootState, ISystemState } from '@/store/interface'
import { getPageList } from '@/api'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state: ISystemState, payload: any) {
      state.userList = payload
    },
    changeUserCount(state: ISystemState, payload: any) {
      state.userCount = payload
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const { list, totalCount } = (
        await getPageList(payload.url, payload.data)
      ).data

      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
