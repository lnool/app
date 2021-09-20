import { Module } from 'vuex'

import { IRootState, ISystemState } from '@/store/interface'
import { getPageList, delPageData, createPageData, editPageData } from '@/api'

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
    async getPageListAction(ctx, payload: any) {
      const pageName = payload.pageName
      const { list, totalCount } = (
        await getPageList(`/${pageName}/list`, payload.data)
      ).data

      ctx.commit(`changeList`, { list, pageName })
      ctx.commit(`changeCount`, { totalCount, pageName })
    },
    async delPageDataAction(ctx, payload: any) {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      const res = await delPageData(url)
      console.log(res)

      ctx.dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 1 }
      })
    },
    async createPageDataAction(ctx, payload: any) {
      const { pageName, data } = payload
      const url = `/${pageName}`
      await createPageData(url, data)

      ctx.dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 1 }
      })
    },
    async editPageDataAction(ctx, payload: any) {
      const { pageName, data, id } = payload
      const url = `/${pageName}/${id}`
      await editPageData(url, data)

      ctx.dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 1 }
      })
    }
  }
}

export default systemModule
