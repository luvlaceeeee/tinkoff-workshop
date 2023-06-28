import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UserLoginForm() {
  return (
    <div className="w-64 space-y-2">
      <Input className="rounded-xl" placeholder="Почта" />
      <Input className="rounded-xl" placeholder="Пароль" />
      <Button className="w-full" variant={"main"}>
        Войти
      </Button>
    </div>
  )
}
