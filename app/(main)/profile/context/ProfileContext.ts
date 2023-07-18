import { createContext } from "react"

import { IUser } from "@/types/interfaces/IUser"

const initialContextValue: IUser = {
  id: 0,
  email: "",
  name: "",
  surname: "",
  mainInformation: "",
  contacts: [],
  createdWhen: 0,
  resumes: [],
  projects: [],
}

export const ProfileContext = createContext<IUser>(initialContextValue)
