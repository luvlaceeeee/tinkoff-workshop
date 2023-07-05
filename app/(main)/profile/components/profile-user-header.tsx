import { IUser } from "@/types/interfaces/IUser"
import { concatStrings } from "@/lib/concatStrings"

type ProfileUserHeaderProps = Pick<IUser, "name" | "surname" | "email">

export function ProfileUserHeader({
  name,
  surname,
  email,
}: ProfileUserHeaderProps) {
  return (
    <header className="space-y-1">
      <h1 className="text-4xl font-bold transition-colors">
        {concatStrings(" ", name, surname)}
      </h1>
      <p className="text-sm text-muted-foreground">{email}</p>
    </header>
  )
}
