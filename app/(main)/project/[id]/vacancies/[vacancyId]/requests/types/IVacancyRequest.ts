import { RequestStatus } from "@/types/RequestStatus"
import { IResume } from "@/types/interfaces/IResume"

export interface IVacancyRequest {
  id: number
  createdWhen: number
  coverLetter?: string
  isInvite: boolean
  status: RequestStatus
  resume: IResume
}
