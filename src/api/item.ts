import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const itemApi = {
  getItemForReview:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `/${id}?fields=id,name,ancestors,address,images,type,isReservable`)
    },
  searchItems:
    (query: string, filter: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM_SEARCH + `?q=${query}&filter=${filter}`)
    },
  getItemDetail:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `/${id}/detail`)
    },
  createItem:
    (data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.ITEM, data)
    },
  updateItem:
    (id: string, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.ITEM + `/${id}`, data)
    },
  getItemForBusinessSearch:
    () => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `?fields=id,name,ancestors,address,type`)
    },
  getOverviewItem:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `/${id}?fields=id,name,ancestors,coordinates,address,description,images,type`)
    },
  getDetailsItem:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `/${id}`)
    },
  getItemsOfLocation:
    (locId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `/location/${locId}`)
    },
  getBrowsingItems:
    (locId: string, type: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.ITEM + `/browsing/${locId}?type=${type}`)
    },
  getQueriedItems:
    (locId: string, type: string, data: object) => 
      (): Promise<AxiosResponse<any, any>> => {
        console.log(data)
      return axiosClient.post(ENDPOINTS.ITEM + `/location/${locId}/query?type=${type}`, data)
    },
}
