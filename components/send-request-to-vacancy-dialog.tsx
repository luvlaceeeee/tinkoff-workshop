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
import { IResume } from "@/types/interfaces/IResume"
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
  resumeId: z.string({ required_error: "Выберите резюме" }),
  coverLetter: z.string().max(200, "Не более 200 символов").optional(),
})

export function SendRequestToVacancyDialog({
  vacancyId,
}: {
  vacancyId: number
}) {
  const [open, setOpen] = useState(false)
  const [coverLetter, setCoverLetter] = useState(false)

  const form = useForm<z.infer<typeof SendRequestToVacancySchema>>({
    resolver: zodResolver(SendRequestToVacancySchema),
  })

  const {
    data: resumes = [],
    isLoading,
    refetch,
  } = useQuery(
    ["user-active-resumes"],
    () =>
      $api
        .get<Pick<IResume, "id" | "direction">[]>("/resumes/active")
        .then((res) => res.data),
    { enabled: false }
  )

  const { mutate, isLoading: isMutationLoading } = useMutation(
    ["request-to-vacancy"],
    (initial: { resumeId: number; positionId: number; coverLetter?: string }) =>
      $api.post("requests/vacancies", initial),
    {
      onSuccess: () => {
        toast({
          variant: "accept",
          title: "Запрос отправлен",
          description: "Ждите ответа от создателя",
        })
        queryClient.invalidateQueries([
          "resume-requests",
          form.getValues("resumeId"),
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
      resumeId: +data.resumeId,
      positionId: vacancyId,
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
              name="resumeId"
              render={({ field }) => (
                <FormItem>
                  <section className="space-y-1 md:space-y-2">
                    <Label className="text-xs md:text-sm">
                      Выберите резюме, которое хотите отправить
                    </Label>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      onOpenChange={() => refetch()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите резюме" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading ? (
                          <Icons.loader className="mx-auto h-7 w-7 fill-main" />
                        ) : resumes.length ? (
                          resumes.map((resume) => (
                            <SelectItem
                              key={generateKey("resume")}
                              className="rounded-xl"
                              value={`${resume.id}`}
                            >
                              {resume.direction.description}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="flex flex-col items-center gap-2 p-3 md:p-4">
                            <p className="text-xs text-muted-foreground md:text-sm">
                              У вас нет активных резюме
                            </p>
                            <Link href={"/create/resume"}>
                              <Button
                                size={"sm"}
                                variant={"secondary"}
                                className="text-xs"
                              >
                                Создать резюме
                              </Button>
                            </Link>
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </section>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex flex-col items-start gap-2 md:gap-3">
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
                          Можете рассказать, почему вы желаете попасть в
                          команду, или указать контакты, по которым с вами лучше
                          связаться
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
                  variant={"outline"}
                  type="button"
                  onClick={() => setOpen(false)}
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
