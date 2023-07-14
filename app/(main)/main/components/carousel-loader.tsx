import { generateKey } from "@/lib/generateKey"
import { Skeleton } from "@/components/ui/skeleton"

export function CarouselLoader() {
  return (
    <div className="flex w-full gap-5">
      {[...new Array(4)].map(() => (
        <Skeleton
          key={generateKey("skeleton")}
          className="h-[250px] w-1/4 flex-1 rounded-2xl"
        />
      ))}
    </div>
  )
}
