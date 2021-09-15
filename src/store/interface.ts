/**
 * store 类型声明
 */

/** 顶层状态 */
export interface IRootState {
  [x: string]: any
  name: string
}

/** 模块状态类型 */
export interface IModuleType {
  login: ILoginState
  system: ISystemState
}

/** 模块状态类型 */
export type IStoreType = IRootState & IModuleType

/** 登录状态 */
export interface ILoginState {
  token: string
  userInfo: any
  menu: []
}

/** 系统状态 */
export interface ISystemState {
  userList: any[]
  userCount: number
}