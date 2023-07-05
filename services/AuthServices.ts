import { AxiosResponse } from "axios"

import $api from "@/config/axios"

export interface AuthResponse {
  username: string
  roles: string[]
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

const login = (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> =>
  $api.post<AuthResponse>("/auth/login", { username: email, password })

export const AuthService = {
  login,
}
