import { RequestStatus } from "@/types/RequestStatus"
import { IVacancy } from "@/types/interfaces/IVacancy"

export interface IResumeRequest {
  id: number
  createdWhen: number
  coverLetter?: string
  isInvite: boolean
  status: RequestStatus
  position: IVacancy
}
