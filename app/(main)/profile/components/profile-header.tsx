"use client"

import { useContext } from "react"

import { concatStrings } from "@/lib/concatStrings"

import { ProfileContext } from "../context/ProfileContext"

export function ProfileHeader() {
  const { name, surname, email } = useContext(ProfileContext)
  return (
    <header className="space-y-1">
      <h1 className="text-4xl font-bold transition-colors">
        {concatStrings(" ", name, surname)}
      </h1>
      <p className="text-sm text-muted-foreground">{email}</p>
    </header>
  )
}
