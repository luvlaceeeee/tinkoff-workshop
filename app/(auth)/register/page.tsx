import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import UserRegisterForm from "./components/user-register-form"

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center space-y-2">
        <Icons.logo />
        <h1 className="text-2xl font-semibold tracking-tight">
          Добро пожаловать!
        </h1>
        <p className="text-sm text-muted-foreground">
          Заполните поля ниже, чтобы создать аккаунт
        </p>
      </div>

      <UserRegisterForm />

      <p className="px-8 text-center text-sm">
        <Button
          variant={"link"}
          className="text-muted-foreground/80 hover:text-muted-foreground"
        >
          <Link href="/login" className="underline underline-offset-4">
            Уже есть аккаунт? Войдите
          </Link>
        </Button>
      </p>
    </div>
  )
}

export default Page
