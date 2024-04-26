import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const locationApi = {
  searchLocations:
    (query: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.LOCATION_SEARCH + `?q=${query}`)
    },
  getLocation:
    (slug: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.LOCATION + `/${slug}`)
    },
  getBreadcrumb:
    (slug: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.LOCATION + `/${slug}/breadcrumb`)
    },
}
