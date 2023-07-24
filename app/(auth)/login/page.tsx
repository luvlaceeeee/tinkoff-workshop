import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { UserLoginForm } from "./components/user-login-form"

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center space-y-2">
        <Icons.logo />
        {/* <h1 className="text-2xl font-semibold tracking-tight">
          С Возвращением!
        </h1> */}
        <p className="text-sm text-muted-foreground">
          Введите почту и пароль, чтобы войти
        </p>
      </div>

      <UserLoginForm />

      <p className="px-8 text-center text-sm">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          <Button
            variant={"link"}
            className="text-muted-foreground/80 hover:text-muted-foreground"
          >
            Нет аккаунта? Зарегистрируйтесь!
          </Button>
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
