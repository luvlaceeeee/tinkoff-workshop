"use client"

//TODO: Add destructive border on input
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import $api from "@/config/axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Обязательное поле" })
      .email({ message: "Неправильный формат почты" }),
    name: z
      .string()
      .min(1, { message: "Обязательное поле" })
      .min(2, { message: "Имя слишком короткое" }),
    surname: z
      .string()
      .min(1, { message: "Обязательное поле" })
      .min(2, { message: "Фамилия слишком короткая" }),
    password: z
      .string()
      .min(6, { message: "Пароль не может быть меньше 6 символов" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Подтверждение пароля обязательно" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  })

export function UserRegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      surname: "",
      password: "",
      confirmPassword: "",
    },
  })

  const router = useRouter()

  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      email,
      password,
      name,
      surname,
    }: {
      email: string
      password: string
      name: string
      surname: string
    }) =>
      $api.post("http://localhost:8080/register", {
        email,
        password,
        name,
        surname,
      }),
    onSuccess: () => {
      toast({
        variant: "accept",
        title: "Регистрация прошла успешно",
        description: "Авторизуйтесь",
      })
      router.push("/login")
    },
    onError: (error: AxiosError) =>
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `${error}`,
      }),
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    mutate(values)
    // router.push("/searchTeam")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-64 space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl"
                  placeholder="example@tinkoff.ru"
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input className="rounded-xl" {...field} />
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
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input className="rounded-xl" {...field} />
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
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input className="rounded-xl" type="password" {...field} />
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input className="rounded-xl" type="password" {...field} />
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
          {isLoading ? "Loading" : "Создать аккаунт"}
        </Button>
      </form>
    </Form>
  )
}
