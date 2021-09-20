import { useStore } from 'vuex'
/**
 *  查询模块数据
 * @param pageName 页面名称
 * @param isQuery 插叙权限
 * @param pageInfo 分页条件
 * @param queryInfo 查询条件
 * @returns
 */
export const usePageData = (
  pageName: string,
  isQuery: boolean,
  pageInfo?: any,
  queryInfo?: any
) => {
  if (!isQuery) return
  pageInfo.currentPage = pageInfo.currentPage ?? 1
  pageInfo.pageSize = pageInfo.pageSize ?? 10
  const store = useStore()
  store.dispatch('system/getPageListAction', {
    pageName: pageName,
    data: {
      offset: (pageInfo.currentPage - 1) * pageInfo.pageSize,
      size: pageInfo.pageSize,
      ...queryInfo
    }
  })
}
