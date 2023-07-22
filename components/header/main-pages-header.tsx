import { ReactNode } from "react"

interface MainPagesHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function MainPagesHeader({
  title,
  description,
  children,
}: MainPagesHeaderProps) {
  return (
    <header className="relative flex items-center justify-between border-b pb-3">
      <div className="space-y-0 sm:space-y-2">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight transition-colors md:text-4xl">
          {title}
        </h1>
        <h2 className="text-sm font-light text-muted-foreground transition-colors md:text-base">
          {description}
        </h2>
      </div>
      {children}
    </header>
  )
}
