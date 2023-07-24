"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { IProject } from "@/types/interfaces/IProject"
import { IVacancy } from "@/types/interfaces/IVacancy"
import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"

import { Icons } from "./icons"
import { queryClient } from "./providers"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Textarea } from "./ui/textarea"
import { toast } from "./ui/use-toast"

const SendRequestToVacancySchema = z.object({
  vacancyId: z.string({ required_error: "Выберите вакансию для отправки" }),
  coverLetter: z.string().max(200, "Не более 200 символов").optional(),
})

export function SendRequestToResumeDialog({ resumeId }: { resumeId: number }) {
  const [open, setOpen] = useState(false)
  const [coverLetter, setCoverLetter] = useState(false)
  const [projectId, setProjectId] = useState<null | number>()

  const form = useForm<z.infer<typeof SendRequestToVacancySchema>>({
    resolver: zodResolver(SendRequestToVacancySchema),
  })

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    refetch: refetchProjects,
  } = useQuery(
    ["user-lead-projects"],
    () =>
      $api
        .get<Pick<IProject, "id" | "title">[]>("/projects", {
          params: { lead: true },
        })
        .then((res) => res.data),
    { enabled: false }
  )

  const {
    data: vacancies = [],
    isLoading: isVacanciesLoading,
    refetch: refetchVacancies,
  } = useQuery(
    ["projects-vacancies", projectId],
    () =>
      $api
        .get<Pick<IVacancy, "id" | "direction">[]>("/positions/projects", {
          params: { projectId: projectId, isVisible: true },
        })
        .then((res) => res.data),
    { enabled: false }
  )

  const { mutate, isLoading: isMutationLoading } = useMutation(
    ["request-to-resume"],
    (initial: { resumeId: number; positionId: number; coverLetter?: string }) =>
      $api.post("/requests/resumes", initial),
    {
      onSuccess: () => {
        toast({
          variant: "accept",
          title: "Запрос отправлен",
          description: "Ждите ответа от пользователя",
        })
        queryClient.invalidateQueries([
          "vacancy-requests",
          form.getValues("vacancyId"),
        ])
        setOpen(false)
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.response?.data.message,
        })
      },
    }
  )

  function onSubmit(data: z.infer<typeof SendRequestToVacancySchema>) {
    const queryData = {
      resumeId: resumeId,
      positionId: +data.vacancyId,
      coverLetter: data.coverLetter,
    }
    mutate(queryData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"main"}>Отправить запрос</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Отправка запроса</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 md:space-y-8"
          >
            <FormField
              control={form.control}
              name="vacancyId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <section className="space-y-1 md:space-y-2">
                    <Label className="text-xs md:text-sm">
                      Выберите проект
                    </Label>
                    <Select
                      onValueChange={(value) => setProjectId(+value)}
                      onOpenChange={() => refetchProjects()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите проект" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isProjectsLoading ? (
                          <Icons.loader className="mx-auto h-7 w-7 fill-main" />
                        ) : projects.length ? (
                          projects.map((project) => (
                            <SelectItem
                              key={generateKey("resume")}
                              className="rounded-xl"
                              value={`${project.id}`}
                            >
                              {project.title}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="flex flex-col items-center gap-2 p-3 md:p-4">
                            <p className="text-xs text-muted-foreground md:text-sm">
                              У вас нет проектов
                            </p>
                            <Link href={"/create/project"}>
                              <Button
                                size={"sm"}
                                variant={"secondary"}
                                className="text-xs"
                              >
                                Создать проект
                              </Button>
                            </Link>
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </section>

                  {projectId && (
                    <section className="space-y-1 md:space-y-2">
                      <Label className="text-xs md:text-sm">
                        Выберите вакансию, которую хотите отправить
                      </Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        onOpenChange={() => refetchVacancies()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите вакансию" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isVacanciesLoading ? (
                            <Icons.loader className="mx-auto h-7 w-7 fill-main" />
                          ) : vacancies.length ? (
                            vacancies.map((vacancy) => (
                              <SelectItem
                                key={generateKey("resume")}
                                className="rounded-xl"
                                value={`${vacancy.id}`}
                              >
                                {vacancy.direction.description}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="flex flex-col items-center gap-2 p-3 md:p-4">
                              <p className="text-xs text-muted-foreground md:text-sm">
                                У вас нет активных вакансий
                              </p>
                              <Link
                                href={`project/${projectId}/vacancies/create`}
                              >
                                <Button
                                  size={"sm"}
                                  variant={"secondary"}
                                  className="text-xs"
                                >
                                  Создать вакансию
                                </Button>
                              </Link>
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </section>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex flex-col gap-2 md:gap-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={coverLetter}
                  onCheckedChange={() => setCoverLetter(!coverLetter)}
                />
                <label className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-sm">
                  Хотите добавить сопроводительное письмо?
                </label>
              </div>
              {coverLetter && (
                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <p className="text-xs font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-xs">
                          Можете рассказать, почему желаете видеть этого
                          разработчика в проекте, или указать контакты, по
                          которым с вами лучше связаться
                        </p>
                        <FormControl>
                          <Textarea {...field} className="resize-none" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </section>

            <DialogFooter>
              <div className="flex gap-5">
                <Button
                  className="w-full flex-1"
                  type="button"
                  onClick={() => setOpen(false)}
                  variant={"outline"}
                >
                  Отменить
                </Button>
                <Button
                  className="w-full"
                  variant={"main"}
                  type="submit"
                  loading={isMutationLoading}
                  disabled={isMutationLoading}
                >
                  Отправить запрос
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
