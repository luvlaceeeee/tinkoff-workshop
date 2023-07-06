"use client"

//BUG: Можно добавит много ссылок на интерфейсе, но на бек они не прилетят
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

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

const userProfileSchema = z.object({
  name: z
    .string({ required_error: "Обязательное поле" })
    .min(2, { message: "Имя слишком короткое" }),
  surname: z
    .string({ required_error: "Обязательное поле" })
    .min(2, { message: "Фамилия слишком короткая" }),
  email: z
    .string({ required_error: "Обязательное поле" })
    .email({ message: "Неправильный формат почты" }),
  contacts: z
    .array(
      z.object({
        value: z.string().url({ message: "Введите правильную ссылку" }),
      })
    )
    .optional(),
  // contacts: z.string().url().array().max(5),
  aboutSelf: z.string().max(250).optional(),
})

type UserProfileFormValues = z.infer<typeof userProfileSchema>

export function ProfileEditForm() {
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    // defaultValues: generateMock(userProfileSchema),
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "contacts",
    control: form.control,
  })
  //В ресет сетить данные, которые прилетят с бека
  function onSubmit(data: UserProfileFormValues) {
    const queryData = {
      ...data,
      contacts: data.contacts?.map((contact) => contact.value),
    }
    console.log(queryData)
    form.reset(data)
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
            <FormField
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
            />
          </section>
          <section className="flex flex-1 flex-col gap-5">
            <FormField
              control={form.control}
              name="aboutSelf"
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
        <Button type="submit" disabled={!form.formState.isDirty}>
          Обновить профиль
        </Button>
      </form>
    </Form>
  )
}
