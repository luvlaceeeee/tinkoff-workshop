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
  mainInformation: "Experienced software engineer with a passion for coding.",
  contacts: ["https://github.com/luvlaceeeee", "https://t.me/luv044"],
  createWhen: 1678924800, // Example epoch timestamp (March 17, 2023)
}

interface AuthState {
  user: IUser
}

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser,
}))
