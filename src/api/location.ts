import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const locationApi = {
  searchLocations:
    (query: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.LOCATION_SEARCH + `?q=${query}`)
    },
  searchListLocations:
    (query: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.LOCATION_LIST + `?q=${query}`)
    },
  getLocation:
    (slug: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.LOCATION + `/${slug}`)
    },
  updateLocation:
    (id: string, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.LOCATION + `/${id}`, data)
    },
  getBreadcrumb:
    (slug: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.LOCATION + `/${slug}/breadcrumb`)
    },
  getLocations:
    (parentId?: string) => (): Promise<AxiosResponse<any, any>> => {
      return parentId
        ? axiosClient.get(ENDPOINTS.LOCATION_LIST + `?parentId=${parentId}`)
        : axiosClient.get(ENDPOINTS.LOCATION_LIST)
    },
  getOverviewLocations:
    (parentId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.LOCATION_LIST + `/${parentId}`)
    },
  createLocation:
    (data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.LOCATION, data)
    },
}
