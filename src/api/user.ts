import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const userApi = {
  getUser: (id: string) => (): Promise<AxiosResponse<any, any>> => {
    return axiosClient.get(ENDPOINTS.USER + `/${id}`)
  },
  interactUser:
    (id: string, follow: boolean) =>
    (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.USER + `/${id}`, { follow })
    },
  getFollowers: (id: string) => (): Promise<AxiosResponse<any, any>> => {
    return axiosClient.get(ENDPOINTS.USER + `/${id}/followers`)
  },
  getFollowings: (id: string) => (): Promise<AxiosResponse<any, any>> => {
    return axiosClient.get(ENDPOINTS.USER + `/${id}/followings`)
  },
}
