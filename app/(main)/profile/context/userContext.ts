import { createContext } from "react"

import { IUser } from "@/types/interfaces/IUser"

const initialContextValue: IUser = {
  id: 0,
  email: "",
  password: "",
  name: "",
  surname: "",
  picture: "",
  mainInformation: "",
  contacts: [],
  createdWhen: 0,
}

export const UserContext = createContext<IUser>(initialContextValue)
