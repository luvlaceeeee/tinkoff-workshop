import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function UserLoginForm() {
  return (
    <div className="w-64 space-y-2">
      {/* <Input className="rounded-xl" placeholder="Почта" />
      <Input className="rounded-xl" placeholder="Пароль" />
      <Button className="w-full" variant={"main"}>
        Войти
      </Button> */}
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      <Button className="w-full">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
  )
}
