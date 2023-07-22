"use client"

import { useContext } from "react"

import { concatStrings } from "@/lib/concatStrings"

import { ProfileContext } from "../context/ProfileContext"

export function ProfileHeader() {
  const { name, surname, email } = useContext(ProfileContext)
  return (
    <header className="md:space-y-1">
      <h1 className="text-2xl font-bold transition-colors md:text-4xl">
        {concatStrings(" ", name, surname)}
      </h1>
      <p className="text-xs text-muted-foreground md:text-sm">{email}</p>
    </header>
  )
}
