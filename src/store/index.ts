import { getPageList } from '@/api'
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import { IRootState, IStoreType } from './interface'

const vuexLocal = new VuexPersistence({
  key: 'store',
  storage: window.localStorage
})

const modulesFiles = require.context('./modules', true, /.ts$/)
// 它将自动模块文件中的所有vuex模块
const modules = modulesFiles
  .keys()
  .reduce((modules: { [x: string]: any }, modulePath: string) => {
    const moduleName = modulePath
      .replace(/^\.\/(.*)\.\w+$/, '$1')
      .replace('/index', '')

    const value = modulesFiles(modulePath)
    if (value) modules[moduleName] = value.default
    return modules
  }, {})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

const state: IRootState = { entireDepartment: [], entireRole: [] }

export default createStore<IRootState>({
  state,
  mutations: {
    changeEntireDepartment(state: { entireDepartment: any }, payload: any) {
      state.entireDepartment = payload
    },
    changeEntireRole(state: { entireRole: any }, payload: any) {
      state.entireRole = payload
    }
  },
  actions: {
    async initialData({ commit }) {
      const { list: departmentList } = (
        await getPageList('/department/list', {
          offset: 0,
          size: 1000
        })
      ).data
      const { list: roleList } = (
        await getPageList('/role/list', {
          offset: 0,
          size: 1000
        })
      ).data
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  modules,
  plugins: [vuexLocal.plugin]
})
