export interface IProject {
  id: number
  leadId: number
  title: string
  theme: string
  description: string
  status: "In Progress" | "Completed" | "On Hold"
  createdWhen: EpochTimeStamp
}
