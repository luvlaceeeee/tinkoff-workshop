import Link from "next/link"

import Logo from "@/components/logo"

import UserLoginForm from "./components/user-login-form"

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="flex flex-col space-y-2 text-center">
        <Logo />
        <h1 className="text-2xl font-semibold tracking-tight">
          С Возвращением!
        </h1>
        <p className="text-sm text-muted-foreground">
          Введите почту и пароль, чтобы войти в аккаунт
        </p>
      </div>
      <UserLoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          Нету аккаунта? Зарегистрируйтесь
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
