import type { AxiosResponse } from "axios"
import { RRError } from "../types"
import store from "../redux/store"
import { setLoaderState } from "../redux/Loader"

export async function apiCaller<R>(
  request: () => Promise<AxiosResponse<R>>,
  errorHandler: (error: RRError) => void = defaultErrorHandler,
) {
  try {
    const response = await request()
    return response
  } catch (error) {
    errorHandler(error as RRError)
  }
  return null
}

function defaultErrorHandler(error: RRError) {
  console.error("An error occurred:", error)
}
