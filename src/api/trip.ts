import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const tripApi = {
  getProfileTrips:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.PROFILE_TRIP + `/${id}`)
    },
  getHomeTrips:
    () => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.HOME_TRIP)
    },
  getSavedTrips:
    () => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.SAVED_TRIP)
    },
  interactTrip:
    (tripId: string, type: string, value: any, content: string = "") =>
    (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(
        ENDPOINTS.INTERACT_TRIP + `/${tripId}`,
        { type, value, content }
      )
    },
  createTrip:
    (data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.TRIP, data)
    },
  getTripDetail:
    (tripId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.TRIP + `/${tripId}`)
    },
}
