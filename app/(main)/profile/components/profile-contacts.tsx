import { HTMLAttributes, useContext } from "react"
import Link from "next/link"

import { generateKey } from "@/lib/generateKey"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { ProfileContext } from "../context/ProfileContext"

type ProfileUserContactsProps = HTMLAttributes<HTMLDivElement>

export function ProfileContacts({
  className,
  ...props
}: ProfileUserContactsProps) {
  const { contacts = [] } = useContext(ProfileContext)
  return (
    <div className={cn("md:space-y-2", className)} {...props}>
      <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
        Контакты
      </h2>
      {contacts.length ? (
        <ul className="ml-6 list-disc md:[&>li]:mt-2">
          {contacts.map((contact) => (
            <li key={generateKey("li")}>
              <Link
                className={cn(buttonVariants({ variant: "link" }), "h-fit p-0")}
                target="_blank"
                href={contact}
              >
                {contact}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Отсутствуют</p>
      )}
    </div>
  )
}
