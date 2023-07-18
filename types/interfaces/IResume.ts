import { Direction } from "../Direction"
import { IUser } from "./IUser"

export interface IResume {
  id: number
  direction: Direction
  description: string
  isActive: boolean
  skills: string[]
  createdWhen: EpochTimeStamp
  user: Omit<IUser, "resumes" | "projects">
}
