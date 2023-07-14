import { IProject } from "./IProject"
import { IResume } from "./IResume"

export interface IUser {
  id: number
  email: string
  name: string
  surname: string
  picture: string
  mainInformation: string
  contacts: string[]
  createdWhen: EpochTimeStamp
  resumes: Omit<IResume, "user">[]
  projects: IProject[]
}
