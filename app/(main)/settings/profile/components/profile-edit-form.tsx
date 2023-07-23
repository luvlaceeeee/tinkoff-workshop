"use client"

//BUG: Можно добавит много ссылок на интерфейсе, но на бек они не прилетят
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { IUser } from "@/types/interfaces/IUser"
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

import { useUpdateProfile } from "../hooks/useUpdateProfile"
import {
  UserProfileSchema,
  userProfileSchema,
} from "../types/userProfileSchema"

interface ProfileEditFormProps {
  user: Omit<IUser, "resumes" | "projects" | "createdWhen" | "email">
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
    mode: "onSubmit",
  })

  const { fields, append, remove } = useFieldArray({
    name: "contacts",
    control: form.control,
  })

  const { mutate, isLoading } = useUpdateProfile()

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
        className="flex w-full flex-col justify-between gap-6"
      >
        <div className="space-y-3 md:flex md:w-full md:justify-between md:gap-6 md:space-y-0">
          <section className="flex flex-col gap-3 md:flex-1 md:gap-6">
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
          </section>

          <section className="flex flex-col gap-5 md:flex-1">
            <FormField
              control={form.control}
              name="mainInformation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>О себе</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Расскажите немного о себе"
                      className="scrollbar resize-none"
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
                          <X className="h-5 w-5 md:h-fit md:w-fit" />
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
                disabled={form.getValues("contacts")?.length! > 5}
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
          className="w-full md:w-fit"
          disabled={!form.formState.isDirty || isLoading}
        >
          Обновить профиль
        </Button>
      </form>
    </Form>
  )
}
