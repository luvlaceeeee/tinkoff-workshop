"use client"

//BUG: Можно добавит много ссылок на интерфейсе, но на бек они не прилетят
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { IUser } from "@/types/interfaces/IUser"
import $api from "@/config/axios"
import { cn } from "@/lib/utils"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/components/providers"

import {
  UserProfileSchema,
  userProfileSchema,
} from "../types/userProfileSchema"

interface ProfileEditFormProps {
  user: IUser
}

export function ProfileEditForm({ user }: ProfileEditFormProps) {
  const form = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      mainInformation: user.mainInformation ?? "",
      contacts: user.contacts
        ? user.contacts.map((contact) => ({ value: contact }))
        : [],
      name: user.name,
      surname: user.surname,
    },
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "contacts",
    control: form.control,
  })

  const { mutate, isLoading } = useMutation(
    ["user-change"],
    (
      values: Omit<UserProfileSchema, "contacts"> & {
        contacts: string[] | undefined
      }
    ) => $api.patch<IUser>("/users", values).then((res) => res.data),
    {
      onSuccess: (data) => {
        toast({
          variant: "accept",
          title: "Профиль обновлен",
        })
        queryClient.invalidateQueries({ queryKey: ["user"] })
        form.reset({
          mainInformation: data.mainInformation,
          name: data.name,
          surname: data.surname,
          contacts: data.contacts.map((contact) => ({ value: contact })),
        })
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: `${error.response?.data.message}`,
        })
      },
    }
  )

  function onSubmit(values: UserProfileSchema) {
    const queryData = {
      ...values,
      contacts: values.contacts?.map((contact) => contact.value),
    }
    mutate(queryData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start gap-6"
      >
        <div className="flex w-full justify-between gap-6">
          <section className="flex flex-1 flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </section>
          <section className="flex flex-1 flex-col gap-5">
            <FormField
              control={form.control}
              name="mainInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>О себе</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Расскажите немного о себе"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3">
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`contacts.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Контакты
                      </FormLabel>
                      <div className="flex items-center gap-3">
                        <FormControl>
                          <Input placeholder="URL" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="shrink-0 border-destructive/50"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <X />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: "" })}
              >
                Добавить контакт
              </Button>
            </div>
          </section>
        </div>
        <Button
          type="submit"
          loading={isLoading}
          disabled={!form.formState.isDirty || isLoading}
        >
          Обновить профиль
        </Button>
      </form>
    </Form>
  )
}
