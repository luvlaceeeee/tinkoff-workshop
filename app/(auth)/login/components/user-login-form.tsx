"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
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
import { toast } from "@/components/ui/use-toast"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .email({ message: "Неправильный формат почты" }),
  password: z.string().min(1, { message: "Обязательное поле" }),
})

export function UserLoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      useAuthStore.getState().login(email, password),
    onSuccess: () => {
      toast({
        variant: "accept",
        title: "Авторизация прошла успешно",
      })
      // router.push("/searchTeam")
    },
    onError: (error: AxiosError) =>
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `${error}`,
      }),
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values)
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
          disabled={!form.formState.isValid}
        >
          {isLoading ? "Загрузка" : "Войти"}
        </Button>
      </form>
    </Form>
  )
}
