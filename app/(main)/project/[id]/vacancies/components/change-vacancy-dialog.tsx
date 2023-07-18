import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { generateKey } from "@/lib/generateKey"
import { skillMap } from "@/lib/skillMap"
import { cn } from "@/lib/utils"
import { useDirection } from "@/hooks/useDirection"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

import {
  CreateVacancySchema,
  createVacancySchema,
} from "../create/types/createVacancySchema"
import { useUpdateVacancy } from "../hooks/useUpdateVacancy"

export function ChangeVacancyDialog(props: IVacancy) {
  const { direction, skills, description, id } = props

  const [open, setOpen] = useState(false)

  const form = useForm<CreateVacancySchema>({
    resolver: zodResolver(createVacancySchema),
    defaultValues: {
      description: description,
      skills: skills.map((skill) => ({
        value: skill,
      })),
      direction: direction.directionName,
    },
    mode: "onSubmit",
  })

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control: form.control,
  })

  const { data: directions = [], isLoading: isDirectionLoading } =
    useDirection()

  const { mutate, isLoading } = useUpdateVacancy(
    id,
    direction.directionName,
    setOpen
  )

  function onSubmit(values: CreateVacancySchema) {
    const queryData = {
      skills: values.skills?.map((skill) => skill.value.toLowerCase()),
      description: values.description,
      direction: values.direction,
    }
    mutate(queryData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        Редактировать информацию
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование резюме</DialogTitle>
          <DialogDescription>
            Измените нужные поля и сохраните
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
            <FormField
              control={form.control}
              name="direction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Направление</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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

            <DialogFooter>
              <Button
                className="w-full"
                type="submit"
                variant={"main"}
                loading={isLoading}
                disabled={isLoading}
              >
                {"Обновить вакансию"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
