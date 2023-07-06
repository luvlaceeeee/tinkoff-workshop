export interface IVacancy {
  id: number
  projectId: number
  direction: string
  userId: number
  description: string
  skills: string[]
  isVisible: boolean
  createWhen: EpochTimeStamp
}
