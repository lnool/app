import Http from './http'

// 生产环境
const production = 'http://127.0.0.1:8000'
// 开发环境
const development = 'http://127.0.0.1:8000'

export default new Http({
  baseURL: process.env.NODE_ENV === 'production' ? production : development,
  timeout: 5000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = ``
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    requestInterceptorCatch: (error) => error,
    responseInterceptor: (response) => response,
    responseInterceptorCatch: (error) => error
  }
})