import axios from "axios"
import { getSession } from "next-auth/react"

// export const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
export const API_URL = "http://31.129.100.122:80/api/v1"

const $api = axios.create({
  baseURL: API_URL,
})

$api.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (session) {
      config.headers.Authorization = `Bearer ${session?.user.access_token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

$api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const session = await getSession()
    const prevRequest = error?.config
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true
      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${session?.user.access_token}`
      return $api(prevRequest)
    }
    return Promise.reject(error)
  }
)

export default $api
