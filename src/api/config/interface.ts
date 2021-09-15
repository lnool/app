import { AxiosResponse } from 'axios'

import type { AxiosRequestConfig } from 'axios'

/**
 * 请求拦截器
 */
export interface RequestInterceptors<T = AxiosResponse> {
  // 请求拦截器
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求错误拦截器
  requestInterceptorCatch?: (error: unknown) => unknown
  // 响应拦截器
  responseInterceptor?: (response: T) => T
  // 响应错误拦截器
  responseInterceptorCatch?: (error: unknown) => unknown
}

/**
 * 请求参数配置：扩展拦截器
 */
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  showLoading?: boolean
}

/** 返回结果 */
export interface IResult {
  code: number
  data: any
}
