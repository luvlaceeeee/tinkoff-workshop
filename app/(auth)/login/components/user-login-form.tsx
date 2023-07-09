"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .email({ message: "Неправильный формат почты" }),
  password: z.string().min(1, { message: "Обязательное поле" }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export function UserLoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()
  const [isLoading, setLoading] = useState(false)

  async function onSubmit(values: LoginSchema) {
    setLoading(true)
    await signIn("credentials", {
      username: values.email,
      password: values.password,
      redirect: false,
    }).then((res) => {
      setLoading(false)
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Неправильная почта или пароль",
        })
      } else {
        toast({
          variant: "accept",
          title: "Успешно",
          description: "Удачной работы!",
        })
        router.push("/main")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-64 space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="rounded-xl" placeholder="Почта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="rounded-xl"
                  type="password"
                  placeholder="Пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          variant={"main"}
          loading={isLoading}
          disabled={!form.formState.isValid || isLoading}
        >
          {"Войти"}
        </Button>
      </form>
    </Form>
  )
}
