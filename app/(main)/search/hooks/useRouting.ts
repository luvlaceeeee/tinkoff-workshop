import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useRouting = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return [router, pathname, searchParams] as const
}
