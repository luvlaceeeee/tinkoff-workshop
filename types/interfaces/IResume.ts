export interface IResume {
  id: number
  direction: string
  description: string
  isActive: boolean
  skills: string[]
  createWhen: EpochTimeStamp
}
