import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { IVacancy } from "@/types/interfaces/IVacancy"
import $api from "@/config/axios"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { IVacancyRequest } from "../types/IVacancyRequest"

export function VacancyRequestsDialog(props: IVacancy) {
  const { direction, id } = props
  const [open, setOpen] = useState(false)

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery(
    ["vacancy-requests", id],
    () =>
      $api
        .get<IVacancyRequest[]>(`/requests/vacancies/${id}`)
        .then((res) => res.data),
    { enabled: false }
  )

  useEffect(() => {
    if (open) refetch()
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"main"}>Посмотреть запросы</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Запросы на вакансию {direction.description}</DialogTitle>
        </DialogHeader>

        <section className="flex flex-col gap-3">
          <h1 className="text-base font-semibold transition-colors">
            Входящие запросы
          </h1>
          {isLoading ? (
            <div>Loading</div>
          ) : (
            requests.map((request) => <div>{request.resume.user.name}</div>)
          )}
        </section>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
