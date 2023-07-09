import { IProject } from "./IProject"

export interface IVacancy {
  id: number
  project: IProject
  direction: { directionName: string; description: string }
  userId: number
  description: string
  skills: string[]
  isVisible: boolean
  createWhen: EpochTimeStamp
}
