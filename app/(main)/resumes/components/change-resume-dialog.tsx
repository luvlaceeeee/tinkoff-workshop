import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { IResume } from "@/types/interfaces/IResume"
import { cn } from "@/lib/utils"
import { useResumeDirection } from "@/hooks/useResumeDirection"
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
import { SkillBadge } from "@/components/skill-badge"

import {
  ResumeSchema,
  resumeSchema,
} from "../../create/resume/types/resumeSchema"
import { useUpdateResume } from "../hooks/useUpdateResume"

export function ChangeResumeDialog(props: IResume) {
  const { direction, skills, description, id } = props

  const [open, setOpen] = useState(false)

  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
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

  const {
    data: directions = [],
    isLoading: isDirectionLoading,
    refetch,
  } = useResumeDirection({ enabled: false })

  const { mutate, isLoading } = useUpdateResume(id, setOpen)

  function onSubmit(values: ResumeSchema) {
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    onOpenChange={() => refetch()}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue
                          placeholder={"Выберите новое направление"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-2xl">
                      {isDirectionLoading ? (
                        <Icons.loader className="mx-auto h-7 w-7 fill-main" />
                      ) : directions.length ? (
                        <>
                          <SelectItem
                            className="rounded-xl"
                            value={direction.directionName}
                          >
                            {direction.description}
                          </SelectItem>
                          {directions.map((direction) => (
                            <SelectItem
                              className="rounded-xl"
                              value={direction.directionName}
                            >
                              {direction.description}
                            </SelectItem>
                          ))}
                        </>
                      ) : (
                        <span className="text-center text-sm">
                          <p className="text-muted-foreground">
                            Все направления заняты.
                          </p>
                          <p className="text-muted">
                            Удалите прошлое резюме с желаемым направлением,
                            чтобы создать новое.
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

            <div className="scrollbar flex max-h-56 flex-wrap gap-3 overflow-y-auto">
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
                          className="shrink-0 border-destructive/50"
                          size="icon"
                          onClick={() => {
                            remove(index)
                          }}
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
                disabled={isLoading || !form.formState.isDirty}
              >
                Обновить резюме
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
