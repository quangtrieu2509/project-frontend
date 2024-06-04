import type { AxiosResponse } from "axios"
import { RRError } from "../types"

export async function apiCaller<R>(
  request: () => Promise<AxiosResponse<R>>,
  errorHandler: (error: RRError) => any = defaultErrorHandler,
) {
  try {
    const response = await request()
    return response
  } catch (error) {
    errorHandler(error as RRError)
  }
  return undefined
}

function defaultErrorHandler(error: RRError) {
  console.error("An error occurred:", error)
}
