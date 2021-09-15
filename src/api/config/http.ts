import axios from 'axios'
import { ElLoading, ILoadingInstance } from 'element-plus'

import type { AxiosInstance } from 'axios'
import type { RequestInterceptors, RequestConfig } from './interface'

/**
 * http 请求类
 */
export default class Http {
  // 请求实例
  instance: AxiosInstance
  // 请求拦截器
  interceptors?: RequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config?.showLoading ?? true
    this.interceptors = config.interceptors

    // config配置拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 默认拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0,0,0,.5)'
          })
        }
        return config
      },
      (err) => {
        // 移除loading
        this.loading?.close()
        return err
      }
    )

    this.instance.interceptors.response.use(
      ({ data }) => {
        // 移除loading
        this.loading?.close()
        if (data.returnCode === '-10001') {
          console.log(`请求失败，错误信息`)
        } else {
          return data
        }
      },
      (err) => {
        // 移除loading
        this.loading?.close()
        if (err.response.status === '404') {
          console.log(`请求失败，错误信息`)
        }
      }
    )
  }

  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 是否显示Loading
      this.showLoading = config.showLoading ?? true
      this.instance
        .request<any, T>(config)
        .then((response) => {
          if (config.interceptors?.responseInterceptor) {
            response = config.interceptors.responseInterceptor(response)
          }
          // 将showLoading设置为true，这样不会影响下一次请求
          this.showLoading = true
          resolve(response)
        })
        .catch((error) => {
          // 将showLoading设置为true，这样不会影响下一次请求
          this.showLoading = true
          reject(error)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
