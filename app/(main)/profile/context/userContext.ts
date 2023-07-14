import { createContext } from "react"

import { IUser } from "@/types/interfaces/IUser"

const initialContextValue: Omit<IUser, "resumes" | "projects"> = {
  id: 0,
  email: "",
  name: "",
  surname: "",
  picture: "",
  mainInformation: "",
  contacts: [],
  createdWhen: 0,
}

export const UserContext =
  createContext<Omit<IUser, "resumes" | "projects">>(initialContextValue)
