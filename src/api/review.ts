import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const reviewApi = {
  createReview:
    (itemId: string, body: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.REVIEW, { itemId, ...body })
    },
  getOverviewRates:
    (itemId: string) =>
    (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.REVIEW_RATES + `/${itemId}`)
    },
  getReviews:
    (itemId: string, filter: string) =>
    (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.REVIEW + `/item/${itemId}?filter=${filter}`)
    },
  getProfileReviews:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.PROFILE_REVIEW + `/${id}`)
    },
  interactReview:
    (id: string, like: boolean) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.REVIEW + `/${id}`, { like })
    },
  getReview:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.REVIEW + `/${id}`)
    },
  getAdminReviews:
    (state: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.REVIEW + `/admin?state=${state}`)
    },
  changeState:
    (id: string, state: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.REVIEW + `/admin/${id}`, { state })
    }
}
