import { AuthResponse, AuthService } from "@/services/AuthServices"
import axios from "axios"
import { create } from "zustand"

import { IUser } from "@/types/interfaces/IUser"

const mockUser: IUser = {
  id: 1,
  email: "example@example.com",
  password: "mypassword123",
  name: "John",
  surname: "Doe",
  picture:
    "https://sun9-31.userapi.com/impg/isjEmyfk5Q2x-oPznsh5pDiktKy8WXSCzKYwfw/cejg6hJfz5A.jpg?size=736x736&quality=95&sign=f9c18865eed5d6aa2182344ee6248cbd&type=album",
  description: "Experienced software engineer with a passion for coding.",
  contacts: ["https://github.com/luvlaceeeee", "https://t.me/luv044"],
  createWhen: 1678924800, // Example epoch timestamp (March 17, 2023)
}

interface AuthState {
  user: IUser
  isAuth: boolean
  login: (email: string, password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: true,
  user: {} as IUser,
  login: async (email, password) => {
    const res = await AuthService.login(email, password)
    localStorage.setItem("token", res.data.access_token)
    set(() => ({ isAuth: true }))
    set(() => ({ user: mockUser }))
  },
  checkAuth: async () => {
    const res = await axios.post<AuthResponse>(
      "http://localhost:8080/oauth/access_token"
    )
    localStorage.setItem("token", res.data.access_token)
    set(() => ({ isAuth: true }))
    set(() => ({ user: mockUser }))
  },
}))
