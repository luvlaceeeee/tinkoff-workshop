export interface IUser {
  id: number
  email: string
  password: string
  name: string
  surname: string
  picture: string
  description: string
  contacts: string[]
  createWhen: EpochTimeStamp
}
