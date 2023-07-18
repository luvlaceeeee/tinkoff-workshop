import { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

interface LinkTitleProps {
  href: string
  className?: string
  children: ReactNode
}

export function LinkTitle(props: LinkTitleProps) {
  const { href, className, children } = props
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "h-fit p-0",
        className
      )}
    >
      {children}
    </Link>
  )
}
