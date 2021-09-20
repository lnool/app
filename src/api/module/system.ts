import http from '../config'
import { IResult } from '../config/interface'

export const getPageList = (url: string, data: any): any =>
  http.post<IResult>({
    url,
    data
  })
export const delPageData = (url: string): any => http.delete<IResult>({ url })

export const createPageData = (url: string, data: any): any =>
  http.post<IResult>({ url, data })

export const editPageData = (url: string, data: any): any =>
  http.patch<IResult>({ url, data })
