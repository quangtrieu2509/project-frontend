/* eslint-disable import/no-extraneous-dependencies */
import axios, { type AxiosError } from "axios"

import { BASE_URL } from "../configs"
import { RRError } from "../types"
import CustomError from "../utils/CustomError"
import { messages } from "../constants/message"
import { Modal } from "antd"
import store from "../redux/store"
import { setLoaderState } from "../redux/Loader"

const token = localStorage.getItem("token")
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    common: {
      Authorization: `Bearer ${token}`,
    },
  },
})

// axiosClient.interceptors.request.use(async (config) => {
//   // Handle token here ...
//   return config;
// });

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error: AxiosError) => {
    if (!error.response) {
      console.error("Unknown error:", error.message)
      return
    }
    const { status, data } = error.response
    if (status >= 500) {
      // TODO: Show server error message
      alert("Something went wrong!")
    } else if (400 <= status && status < 500) {
      switch ((data as RRError).ec) {
        case messages.EMAIL_EXISTED.ec: {
          Modal.error({
            title: "Error",
            content: "Email existed already. Try another.",
            className: "error-modal",
            okType: "danger",
            centered: true,
          })
          break
        }
        case messages.SIGN_IN_ERROR.ec: {
          Modal.error({
            title: "Error",
            content: "Wrong sign-in information. Try again.",
            className: "error-modal",
            okType: "danger",
            centered: true,
          })
          break
        }
        case messages.ACCESS_TOKEN_EXPIRED.ec: {
          alert(messages.ACCESS_TOKEN_EXPIRED.msg)
          break
        }
        case messages.ACCESS_TOKEN_INVALID.ec: {
          alert(messages.ACCESS_TOKEN_INVALID.msg)
          break
        }
      }
      throw new CustomError(data as RRError)
    }
  },
)
export default axiosClient
