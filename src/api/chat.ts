import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const chatApi = {
  createMessage:
    (data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.CHAT, data)
    },
  getUserConvos:
    (unread: boolean = false) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.CHAT + `?unread=${unread ? unread : ""}`)
    },
  getMessageList:
    (convoId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.CHAT + `/${convoId}`)
    }
}
