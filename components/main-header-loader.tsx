import { Separator } from "./ui/separator"

export function MainHeaderLoader() {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div className="space-y-2">
        <Separator className="h-12 w-96 rounded-2xl" />
        <Separator className="h-5 w-72 rounded-2xl" />
      </div>
      <div className="flex gap-2">
        <Separator className="h-10 w-32 rounded-2xl" />
        <Separator className="h-10 w-32 rounded-2xl" />
      </div>
    </div>
  )
}
