import { CreateResumeForm } from "./components/create-resume-form"
import CreateResumeUser from "./components/create-resume-user"

function CreateResumePage() {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row">
      <CreateResumeForm />
      <CreateResumeUser />
    </div>
  )
}

export default CreateResumePage
