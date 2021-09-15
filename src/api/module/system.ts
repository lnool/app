import http from '../config'
import { IResult } from '../config/interface'

export const getPageList = (url: string, data: any): any =>
  http.post<IResult>({
    url,
    data
  })
