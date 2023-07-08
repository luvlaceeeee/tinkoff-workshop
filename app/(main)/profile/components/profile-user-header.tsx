import { useContext } from "react"

import { concatStrings } from "@/lib/concatStrings"

import { UserContext } from "../page"

export function ProfileUserHeader() {
  const { name, surname, email } = useContext(UserContext)
  return (
    <header className="space-y-1">
      <h1 className="text-4xl font-bold transition-colors">
        {concatStrings(" ", name, surname)}
      </h1>
      <p className="text-sm text-muted-foreground">{email}</p>
    </header>
  )
}
