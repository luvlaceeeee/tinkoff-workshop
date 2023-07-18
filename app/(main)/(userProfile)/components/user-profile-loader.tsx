import { Skeleton } from "@/components/ui/skeleton"
import { MainHeaderLoader } from "@/components/main-header-loader"

export function UserProfileLoading() {
  return (
    <div className="flex flex-col">
      <MainHeaderLoader />
      <div className="flex flex-col gap-5 pt-5">
        <div className="flex gap-5">
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-44 w-44 rounded-full" />
          </div>
          <div className="w-full flex-1 space-y-1">
            <Skeleton className="h-52 max-w-lg rounded-2xl" />
          </div>
          <div className="w-full flex-1 space-y-1">
            <Skeleton className="h-52 max-w-lg rounded-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton className="h-12 w-96 rounded-2xl" />
          <div className="flex gap-5">
            <Skeleton className="h-52 w-full flex-1 rounded-2xl" />
            <Skeleton className="h-52 w-full flex-1 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
