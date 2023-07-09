import { Skeleton } from "@/components/ui/skeleton"

export function ProfileLoading() {
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-44 w-44 rounded-full" />
        <Skeleton className="h-10 w-full rounded-2xl" />
        <Skeleton className="h-10 w-full rounded-2xl" />
      </div>
      <div className="flex h-fit w-full flex-col gap-5 border-b pb-4">
        <div className="w-full space-y-1">
          <Skeleton className="h-10 max-w-lg rounded-2xl" />
          <Skeleton className="h-5 max-w-xs rounded-2xl" />
        </div>
        <div className="flex w-full justify-between gap-5">
          <Skeleton className="h-24 w-full flex-1 rounded-2xl" />
          <Skeleton className="h-24 w-full flex-1 rounded-2xl" />
        </div>
      </div>
    </>
  )
}
