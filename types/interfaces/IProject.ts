import { ProjectContact } from "../ProjectContact"
import { IProjectMember } from "./IProjectMember"

export interface IProject {
  id: number
  title: string
  theme: string
  description: string
  status: ProjectStatus
  contacts: ProjectContact[]
  isLeader: boolean
  members: IProjectMember[]
  vacanciesCount: number
  createdWhen: EpochTimeStamp
  membersCount: number
}
