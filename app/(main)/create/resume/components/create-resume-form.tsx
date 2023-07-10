"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

import { ResumeSchema, resumeSchema } from "../types/resumeSchema"

type Direction = { directionName: string; description: string }

export function CreateResumeForm() {
  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: { addSkills: "" },
    mode: "onChange",
  })

  const {
    data: directions = [],
    isLoading,
    refetch,
  } = useQuery<Direction[]>(
    ["directions"],
    () =>
      $api
        .get<Direction[]>("dictionaries/directions/resumes")
        .then((res) => res.data),
    { enabled: false }
  )

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control: form.control,
  })

  function onSubmit(values: ResumeSchema) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-5">
        <FormField
          control={form.control}
          name="direction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Направление</FormLabel>
              <Select
                onValueChange={field.onChange}
                onOpenChange={() => refetch()}
              >
                <FormControl>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Выберите ваше направление" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-2xl">
                  {isLoading ? (
                    <Icons.loader className="mx-auto h-7 w-7 fill-main" />
                  ) : (
                    directions.map((direction) => (
                      <SelectItem
                        className="rounded-xl"
                        value={direction.directionName}
                      >
                        {direction.description}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название навыка</FormLabel>
              <FormControl>
                <div className="flex items-center gap-5">
                  <Input {...field} />
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0"
                    disabled={
                      !form.getValues("addSkills") ||
                      !!form.getFieldState("addSkills").error
                    }
                    onClick={() => {
                      append(
                        { value: form.getValues("addSkills")! },
                        { shouldFocus: false }
                      )
                      form.resetField("addSkills")
                    }}
                  >
                    Добавить Навык
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`skills.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Input placeholder="Навык" {...field} />
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Об опыте разработки</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Расскажите немного о опыте разработки"
                  className="resize-none rounded-2xl"
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
          {"Создать резюме"}
        </Button>
      </form>
    </Form>
  )
}
