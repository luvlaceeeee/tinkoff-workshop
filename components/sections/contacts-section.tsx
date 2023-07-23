import { HTMLAttributes } from "react"
import Link from "next/link"

import { generateKey } from "@/lib/generateKey"
import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

interface ContactSectionProps extends HTMLAttributes<HTMLElement> {
  contacts: string[]
  titleSize: string
}

export function ContactSection({
  contacts = [],
  titleSize,
  className,
  ...props
}: ContactSectionProps) {
  return (
    <section className={cn(className)} {...props}>
      <h2 className={cn("font-semibold transition-colors", titleSize)}>
        Контакты
      </h2>
      {contacts.length ? (
        contacts.map((contact) => (
          <ul className="ml-6 list-disc md:[&>li]:mt-2">
            <li key={generateKey("li")}>
              <Link
                className={cn(buttonVariants({ variant: "link" }), "h-fit p-0")}
                target="_blank"
                href={contact}
              >
                {contact}
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">Отсутствуют</p>
      )}
    </section>
  )
}
