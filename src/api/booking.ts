import { ENDPOINTS } from "../constants"
import { bookingStates } from "../constants/booking-states"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const bookingApi = {
  createBooking:
    (itemId: string, body: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.BOOKING, { itemId, ...body })
    },
  getBookings:
    (type: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.BOOKING + `?state=${type}`)
    },
  getBusinessBookings:
    (itemId: string, type: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.BOOKING_BUSINESS + `/${itemId}?state=${type}`)
    },
  updateBooking:
    (id: string, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.put(ENDPOINTS.BOOKING + `/${id}`, data)
    },
  updateBusinessBooking:
    (itemId: string, id: string, data: any) => (): 
      Promise<AxiosResponse<any, any>> => {
        return axiosClient.put(ENDPOINTS.BOOKING_BUSINESS + `/${itemId}/${id}`, data)
    },
}
