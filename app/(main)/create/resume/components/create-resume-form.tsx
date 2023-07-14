"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { skills } from "@/config/skills"
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
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

import { useDirection } from "../../../../../hooks/useDirection"
import { useCreateResume } from "../hooks/useCreateResume"
import { ResumeSchema, resumeSchema } from "../types/resumeSchema"

export function CreateResumeForm() {
  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: { addSkills: "" },
    mode: "onSubmit",
  })

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control: form.control,
  })

  const {
    data: directions = [],
    isLoading: isDirectionLoading,
    refetch,
  } = useDirection({ enabled: false })

  const { mutate, isLoading } = useCreateResume()

  function onSubmit(values: ResumeSchema) {
    const queryData = {
      skills: values.skills?.map((skill) => skill.value.toLowerCase()),
      description: values.description,
      direction: values.direction,
    }
    mutate(queryData)
  }

  //For popover
  const [skillsSearch, setSkillsSearch] = useState(skills)
  useEffect(() => {
    const searchValue = form.watch("addSkills")
    setSkillsSearch(
      skills.filter((skill) =>
        skill.toLowerCase().includes(searchValue!.toLowerCase())
      )
    )
    return () => {
      setSkillsSearch(skills)
    }
  }, [form.watch("addSkills")])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-5">
        <FormField
          control={form.control}
          name="direction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Направление</FormLabel>
              <Select
                onValueChange={field.onChange}
                onOpenChange={() => !directions.length && refetch()}
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

        <FormField
          control={form.control}
          name="addSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название навыка</FormLabel>
              <FormControl>
                <div className="flex items-center gap-5">
                  {/* <Input {...field} /> */}
                  <Popover
                    open={
                      !!form.getValues("addSkills") && !!skillsSearch.length
                    }
                  >
                    <PopoverTrigger>
                      <Input {...field} placeholder="Введите название навыка" />
                    </PopoverTrigger>
                    <PopoverContent
                      onOpenAutoFocus={(e) => e.preventDefault()}
                      onCloseAutoFocus={(e) => e.preventDefault()}
                      className="p-0"
                    >
                      <ul>
                        {skillsSearch.slice(0, 5).map((skill) => (
                          <li>
                            <Button
                              variant={"ghost"}
                              size={"sm"}
                              className="w-full justify-start rounded-none"
                              onClick={() => {
                                append({ value: skill }, { shouldFocus: false })
                                form.resetField("addSkills")
                              }}
                            >
                              {skill}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
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
              <p className={cn("text-sm font-medium text-destructive")}>
                {form.getFieldState("skills").error?.message}
              </p>
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
                      {/* <Input placeholder="Навык" {...field} disabled={true} /> */}
                      <p className="rounded-xl border p-2 px-3 text-sm">
                        {field.value}
                      </p>
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
                </FormItem>
              )}
            />
          ))}
        </div>

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
