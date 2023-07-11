import { CreateResumeForm } from "./components/create-resume-form"
import CreateResumeUser from "./components/create-resume-user"

function CreateResumePage() {
  return (
    <div className="flex justify-between gap-5">
      <CreateResumeForm />
      <CreateResumeUser />
    </div>
  )
}

export default CreateResumePage
