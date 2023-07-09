import { LoaderIcon } from "lucide-react"

function ProfileLoading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
      <LoaderIcon className="h-12 w-12 animate-spin" />
    </div>
  )
}

export default ProfileLoading
