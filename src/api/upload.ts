import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const uploadApi = {
  upLoadData:
    (files: any[]) => (): Promise<AxiosResponse<any, any>> => {
      const data = new FormData()
      files.forEach(file => {
        data.append("files", file)
      })
     
      return axiosClient.post(ENDPOINTS.UPLOAD, data, { headers: { "Content-Type": "multipart/form-data" } })
    },
}
