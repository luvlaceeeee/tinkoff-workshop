"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { IResume } from "@/types/interfaces/IResume"
import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"

import { Icons } from "./icons"
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
        setOpen(false)
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="resumeId"
              render={({ field }) => (
                <FormItem>
                  <section className="space-y-2">
                    <Label className="text-sm">
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
                        ) : (
                          resumes.map((resume) => (
                            <SelectItem
                              key={generateKey("resume")}
                              className="rounded-xl"
                              value={`${resume.id}`}
                            >
                              {resume.direction.description}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </section>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={coverLetter}
                  onCheckedChange={() => setCoverLetter(!coverLetter)}
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                        <p className="text-xs font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Можете рассказать, почему вы хотите попасть в команду
                          или указать контакты, по которым с вами лучше
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
              <Button className="w-full" variant={"outline"}>
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}