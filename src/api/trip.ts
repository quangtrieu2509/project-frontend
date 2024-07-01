import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const tripApi = {
  getProfileTrips:
    (id: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.PROFILE_TRIP + `/${id}`)
    },
  getDrawerTrips:
    (itemId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.DRAWER_TRIP + `?itemId=${itemId}`)
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
    (tripId: string, like: boolean) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.TRIP + `/${tripId}`, { like })
    },
  createTrip:
    (data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.TRIP, data)
    },
  updateTrip:
    (tripId: string, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.TRIP + `/${tripId}`, data)
    },
  addItemToTrip:
    (tripId: any, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.TRIP + `/${tripId}/saves`, data)
    },
  addItineraryItem:
    (tripId: any, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.TRIP + `/${tripId}/itinerary`, data)
    },
  removeItemFromTrip:
    (id: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.delete(ENDPOINTS.TRIP + `/saved-item/${id}`)
    },
  getSavedItems:
    (tripId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.TRIP + `/${tripId}/saves`)
    },
  getItineraryItems:
    (tripId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.TRIP + `/${tripId}/itinerary`)
    },
  removeItineraryItems:
    (tripId: string, removedList: string[]) => 
      (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.TRIP + `/${tripId}/itinerary`, { removedList })
    },
  updateSavedItem:
    (id: string, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.TRIP + `/saved-item/${id}`, data)
    },
  editItineraryItem:
    (id: string, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.TRIP + `/itinerary-item/${id}`, data)
    },
  getTripDetail:
    (tripId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.TRIP + `/${tripId}`)
    }
}
