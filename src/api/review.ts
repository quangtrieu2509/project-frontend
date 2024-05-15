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
      return axiosClient.get(ENDPOINTS.REVIEW + `/${itemId}?filter=${filter}`)
    },
}
