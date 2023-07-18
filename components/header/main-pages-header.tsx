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
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight transition-colors lg:text-5xl">
          {title}
        </h1>
        <h2 className="text-base font-light text-muted-foreground transition-colors">
          {description}
        </h2>
      </div>
      {children}
    </header>
  )
}
