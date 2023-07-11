export interface IUser {
  id: number
  email: string
  password: string
  name: string
  surname: string
  picture: string
  mainInformation: string
  contacts: string[]
  createdWhen: EpochTimeStamp
}
