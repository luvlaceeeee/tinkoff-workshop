import { generateKey } from "@/lib/generateKey"
import { Skeleton } from "@/components/ui/skeleton"

export function CarouselLoader() {
  return (
    <div className="flex w-full gap-5 overflow-x-auto md:overflow-hidden">
      {[...new Array(4)].map(() => (
        <Skeleton
          key={generateKey("skeleton")}
          className="h-[250px] w-[350px]  shrink-0  rounded-2xl"
        />
      ))}
    </div>
  )
}
