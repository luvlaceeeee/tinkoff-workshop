import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { IResume } from "@/types/interfaces/IResume"
import { skills } from "@/config/skills"
import { skillMap } from "@/lib/skillMap"
import { cn } from "@/lib/utils"
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

import { useResumeDirection } from "../../../../hooks/useResumeDirection"
import {
  ResumeSchema,
  resumeSchema,
} from "../../create/resume/types/resumeSchema"
import { useUpdateResume } from "../hooks/useUpdateResume"

export function ChangeResumeDialog(props: IResume) {
  const { direction, skills: initialSkills, description, id } = props

  const [open, setOpen] = useState(false)

  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      addSkills: "",
      description: description,
      skills: initialSkills.map((skill) => ({
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
                        directions.map((direction) => (
                          <SelectItem
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
                          <Input
                            {...field}
                            placeholder="Введите название навыка"
                          />
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
                                    append(
                                      { value: skill },
                                      { shouldFocus: false }
                                    )
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
                          {/* <Input placeholder="Навык" {...field} disabled={true} /> */}
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
