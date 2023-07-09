import { HTMLAttributes, useContext } from "react"
import Link from "next/link"

import { generateKey } from "@/lib/generateKey"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { UserContext } from "../context/UserContext"

type ProfileUserContactsProps = HTMLAttributes<HTMLDivElement>

export function ProfileUserContacts({
  className,
  ...props
}: ProfileUserContactsProps) {
  const { contacts = [] } = useContext(UserContext)
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <h2 className="text-3xl font-semibold transition-colors">Контакты</h2>
      <ul className="ml-6 list-disc [&>li]:mt-2">
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
    </div>
  )
}
