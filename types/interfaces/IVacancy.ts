import { Direction } from "../Direction"
import { IProject } from "./IProject"

export interface IVacancy {
  id: number
  project: IProject
  direction: Direction
  description: string
  skills: string[]
  isVisible: boolean
  createdWhen: EpochTimeStamp
}
