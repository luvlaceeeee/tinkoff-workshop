import axios from "axios"
import { getSession, signIn } from "next-auth/react"

//TODO Перенести в env

export const API_URL = "http://localhost:8080/api/v1"

const $api = axios.create({
  baseURL: API_URL,
})

export const refreshToken = async () => {
  const session = await getSession()
  if (session) {
    const res = await axios.post(
      "http://localhost:8080/auth/access_token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: `${session?.user.refresh_token}`,
      })
    )

    session.user.access_token = res.data.access_token
  } else signIn()
}

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
      await refreshToken()
      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${session?.user.access_token}`
      return $api(prevRequest)
    }
    return Promise.reject(error)
  }
)

export default $api
