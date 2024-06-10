import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const notiApi = {
  getAllNotis:
    () => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.NOTI)
    },
  getUnreadNotis:
    () => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.NOTI + `?isSeen=false`)
    },
  readAllNotis:
    () => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.NOTI)
    },
  readNoti:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.NOTI + `/${id}`)
    },
}
