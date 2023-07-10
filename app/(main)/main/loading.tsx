import { Icons } from "@/components/icons"

function MainPageLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
      <Icons.loader className="h-14 w-14 fill-main" />
    </div>
  )
}

export default MainPageLoading
