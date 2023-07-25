"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { generateKey } from "@/lib/generateKey"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { MultiSelectSkillsForm } from "@/components/multi-select-skills-form"
import { SkillBadge } from "@/components/skill-badge"

import { useResumeDirection } from "../../../../../hooks/useResumeDirection"
import { useCreateResume } from "../hooks/useCreateResume"
import { ResumeSchema, resumeSchema } from "../types/resumeSchema"

export function CreateResumeForm() {
  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: { description: "" },
    mode: "onSubmit",
  })

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control: form.control,
  })

  const { data: directions = [], isLoading: isDirectionLoading } =
    useResumeDirection()

  const { mutate, isLoading } = useCreateResume()

  function onSubmit(values: ResumeSchema) {
    const queryData = {
      skills: values.skills?.map((skill) => skill.value),
      description: values.description,
      direction: values.direction,
    }
    mutate(queryData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:flex-1 md:space-y-5"
      >
        <FormField
          control={form.control}
          name="direction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Направление</FormLabel>
              <Select onValueChange={field.onChange}>
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Об опыте разработки</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Расскажите немного о опыте разработки в выбранном направлении"
                  className="resize-none rounded-2xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-3">
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`skills.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormControl>
                      <SkillBadge skill={field.value} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-7 w-7 shrink-0 rounded-md border-destructive/50 md:h-10 md:w-10 md:rounded-xl"
                      size="icon"
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      <X className="h-5 w-5 md:h-fit md:w-fit" />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>
        <div>
          <MultiSelectSkillsForm
            append={append}
            selected={
              form.watch("skills")
                ? form.watch("skills").map((skill) => skill.value)
                : []
            }
          />
          <p className={cn("text-sm font-medium text-destructive")}>
            {form.getFieldState("skills").error?.message}
          </p>
        </div>

        <Button
          className="w-full"
          type="submit"
          variant={"main"}
          loading={isLoading}
          disabled={isLoading}
        >
          {"Создать резюме"}
        </Button>
      </form>
    </Form>
  )
}
