import { create } from "zustand"

interface IUser {
  login: string
  password: string
  email: string
  firstName: string
  lastName: string
  description: string
  avatar: string
}

const mockUser: IUser = {
  login: "luvluvluv",
  password: "123456",
  email: "avivioBrunu@gmail.com",
  firstName: "Никита",
  lastName: "Брунов",
  description: "унижаю на реакте",
  avatar:
    "https://sun9-31.userapi.com/impg/isjEmyfk5Q2x-oPznsh5pDiktKy8WXSCzKYwfw/cejg6hJfz5A.jpg?size=736x736&quality=95&sign=f9c18865eed5d6aa2182344ee6248cbd&type=album",
}

interface AuthState {
  user: IUser
  isAuth: boolean
  setAuth: (initial: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: true,
  user: mockUser,
  setAuth: (initial) => set((state) => ({ isAuth: initial })),
}))
