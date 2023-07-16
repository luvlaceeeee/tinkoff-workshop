import { createContext } from "react"

import { IUser } from "@/types/interfaces/IUser"

const initialContextValue: Omit<IUser, "projects"> = {
  id: 0,
  email: "",
  name: "",
  surname: "",
  picture: "",
  mainInformation: "",
  contacts: [],
  createdWhen: 0,
  resumes: [],
}

export const ProfileContext =
  createContext<Omit<IUser, "projects">>(initialContextValue)
