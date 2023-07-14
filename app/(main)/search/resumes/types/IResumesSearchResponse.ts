import { IResume } from "@/types/interfaces/IResume"

export interface IResumesSearchResponse {
  content: Omit<IResume, "isActive">[]
  pageCount: number
}
