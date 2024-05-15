import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const itemApi = {
  getItemForReview:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `/${id}?fields=id,name,ancestors,address,images,type`)
    },
  searchItems:
    (query: string, filter: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM_SEARCH + `?q=${query}&filter=${filter}`)
    },
  getItemDetail:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `/${id}/detail`)
    }
}
