import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const authApi = {
  signInByGoogle: (token: string) => (): Promise<AxiosResponse<any, any>> => {
    return axiosClient.get(ENDPOINTS.GOOGLE_AUTH, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  signUpByGoogle:
    (token: string, data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.GOOGLE_AUTH, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  signInByEmail: (data: any) => (): Promise<AxiosResponse<any, any>> => {
    return axiosClient.post(ENDPOINTS.EMAIL_SIGNIN_AUTH, data)
  },
  signUpByEmail: (data: any) => (): Promise<AxiosResponse<any, any>> => {
    return axiosClient.post(ENDPOINTS.EMAIL_SIGNUP_AUTH, data)
  },
}
