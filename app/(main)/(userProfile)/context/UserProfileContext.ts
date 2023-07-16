import { createContext } from "react"

import { IUser } from "@/types/interfaces/IUser"

const initialContextValue: IUser = {
  id: 0,
  email: "",
  name: "",
  surname: "",
  picture: "",
  mainInformation: "",
  contacts: [],
  createdWhen: 0,
  resumes: [],
  projects: [],
}

export const UserProfileContext = createContext<IUser>(initialContextValue)
