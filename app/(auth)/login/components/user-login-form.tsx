"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .email({ message: "Неправильный формат почты" }),
  password: z.string().min(1, { message: "Обязательное поле" }),
})

export default function UserLoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()
  function onSubmit(values: z.infer<typeof loginSchema>) {
    router.push("/searchTeam")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-64 space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Почта</FormLabel> */}
              <FormControl>
                <Input className="rounded-xl" placeholder="Почта" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Пароль</FormLabel> */}
              <FormControl>
                <Input
                  className="rounded-xl"
                  type="password"
                  placeholder="Пароль"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          variant={"main"}
          disabled={!form.formState.isValid}
        >
          Войти
        </Button>
      </form>
    </Form>
  )
}
