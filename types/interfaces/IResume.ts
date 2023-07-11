import { IUser } from "./IUser"

export interface IResume {
  id: number
  direction: { directionName: string; description: string }
  description: string
  isActive: boolean
  skills: string[]
  createdWhen: EpochTimeStamp
  user: IUser[]
}
