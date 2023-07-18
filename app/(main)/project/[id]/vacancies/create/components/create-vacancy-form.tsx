"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { SKILLS } from "@/config/skills"
import { generateKey } from "@/lib/generateKey"
import { skillMap } from "@/lib/skillMap"
import { cn } from "@/lib/utils"
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

import { useCreateVacancy } from "../hooks/useCreateVacancy"
import {
  CreateVacancySchema,
  createVacancySchema,
} from "../types/createVacancySchema"

export function CreateVacancyForm({ projectId }: { projectId: number }) {
  const form = useForm<CreateVacancySchema>({
    resolver: zodResolver(createVacancySchema),
    defaultValues: { addSkills: "" },
    mode: "onSubmit",
  })

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control: form.control,
  })

  const { data: directions = [], isLoading: isDirectionLoading } =
    useDirection()

  const { mutate, isLoading } = useCreateVacancy(projectId)

  function onSubmit(values: CreateVacancySchema) {
    const queryData = {
      skills: values.skills?.map((skill) => skill.value.toLowerCase()),
      description: values.description,
      direction: values.direction,
    }
    mutate(queryData)
  }

  //For popover
  const [skillsSearch, setSkillsSearch] = useState(SKILLS)
  useEffect(() => {
    const searchValue = form.watch("addSkills")
    setSkillsSearch(
      SKILLS.filter((skill) =>
        skill.toLowerCase().includes(searchValue!.toLowerCase())
      )
    )
    return () => {
      setSkillsSearch(SKILLS)
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
                // onOpenChange={() => !directions.length && refetch()}
              >
                <FormControl>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Выберите направление вакансии" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-2xl">
                  {isDirectionLoading ? (
                    <Icons.loader className="mx-auto h-7 w-7 fill-main" />
                  ) : (
                    directions.map((direction) => (
                      <SelectItem
                        key={generateKey(direction.directionName)}
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
                              {skillMap(skill)}
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
                      <p className="rounded-xl border p-2 px-3 text-sm">
                        {skillMap(field.value)}
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
              <FormLabel>Описание вакансии</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Расскажите немного о том, чем предстоит заниматься"
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
