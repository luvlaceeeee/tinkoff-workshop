"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { generateKey } from "@/lib/generateKey"
import { statusMap } from "@/lib/statusMap"
import { useDirection } from "@/hooks/useDirection"
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

import { useProjectStatuses } from "../../../../../hooks/useProjectStatuses"
import { useCreateProject } from "../hooks/useCreateProject"
import { ProjectSchema, projectSchema } from "../types/projectSchema"

export function CreateProjectForm() {
  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: "", theme: "", description: "" },
    mode: "onSubmit",
  })

  const { fields, append, remove } = useFieldArray({
    name: "contacts",
    control: form.control,
  })

  const {
    data: directions = [],
    isLoading: isDirectionLoading,
    refetch: refetchDirections,
  } = useDirection()

  const {
    data: statuses = [],
    isLoading: isStatusLoading,
    refetch: refetchStatuses,
  } = useProjectStatuses()

  const { mutate, isLoading } = useCreateProject()

  function onSubmit(values: ProjectSchema) {
    mutate(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название проекта</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тема проекта</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание проекта</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Расскажите о проекте"
                  className="resize-none rounded-2xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус проекта</FormLabel>
              <Select
                onValueChange={field.onChange}
                onOpenChange={() => !statuses.length && refetchStatuses()}
              >
                <FormControl>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Выберите статус проекта" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-2xl">
                  {isStatusLoading ? (
                    <Icons.loader className="mx-auto h-7 w-7 fill-main" />
                  ) : (
                    statuses.map((status) => (
                      <SelectItem
                        key={generateKey(status.statusName)}
                        className="rounded-xl"
                        value={status.statusName}
                      >
                        {statusMap(status.description)}
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
          name="direction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше Направление</FormLabel>
              <Select
                onValueChange={field.onChange}
                onOpenChange={() => !directions.length && refetchDirections()}
              >
                <FormControl>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Выберите ваше направление" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-2xl">
                  {isDirectionLoading ? (
                    <Icons.loader className="mx-auto h-7 w-7 fill-main" />
                  ) : directions.length ? (
                    directions.map((direction) => (
                      <SelectItem
                        key={generateKey(direction.directionName)}
                        className="rounded-xl"
                        value={direction.directionName}
                      >
                        {direction.description}
                      </SelectItem>
                    ))
                  ) : (
                    <span className="text-center text-sm">
                      <p className="text-muted-foreground">
                        Все направления заняты.
                      </p>
                      <p className="text-muted">
                        Удалите прошлое резюме с желаемым направлением, чтобы
                        создать новое.
                      </p>
                    </span>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex flex-1 flex-col gap-5">
          <div className="space-y-3">
            <FormLabel>Инфраструктура</FormLabel>
            {fields.map((field, index) => (
              <div className="flex flex-col gap-3" key={field.id}>
                <FormField
                  control={form.control}
                  name={`contacts.${index}.link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ссылка</FormLabel>
                      <FormControl>
                        <Input placeholder="URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`contacts.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Input placeholder="URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 block"
              onClick={() => append({ link: "", description: "" })}
            >
              Добавить ссылку
            </Button>
          </div>
        </section>
        <Button
          className="w-full"
          type="submit"
          variant={"main"}
          loading={isLoading}
          disabled={isLoading}
        >
          {"Создать проект"}
        </Button>
      </form>
    </Form>
  )
}
