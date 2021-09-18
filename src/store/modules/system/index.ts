import { Module } from 'vuex'

import { IRootState, ISystemState } from '@/store/interface'
import { getPageList } from '@/api'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeList(state: ISystemState & any, payload: any): void {
      const { pageName, list } = payload
      state[`${pageName}/List`] = list
    },
    changeCount(state: ISystemState & any, payload: any): void {
      const { pageName, totalCount } = payload
      state[`${pageName}/Count`] = totalCount
    }
  },
  getters: {
    getList: (state: ISystemState & any) => (pageName: string) =>
      state[`${pageName}/List`],
    getCount: (state: ISystemState & any) => (pageName: string) =>
      state[`${pageName}/Count`]
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const { list, totalCount } = (
        await getPageList(`/${pageName}/list`, payload.data)
      ).data

      commit(`changeList`, { list, pageName })
      commit(`changeCount`, { totalCount, pageName })
    }
  }
}

export default systemModule
