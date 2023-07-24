"use client"

import { Fragment } from "react"

import { IVacancy } from "@/types/interfaces/IVacancy"
import { generateKey } from "@/lib/generateKey"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { VacancyCardSmall } from "@/components/cards/vacancy-card-sm"
import { useVacancyById } from "@/app/(main)/vacancy/hooks/useVacancyById"

import { VacancyRequestCard } from "./components/vacancy-request-card"
import { useVacancyRequests } from "./hooks/useVacancyRequests"

export default function VacancyRequestsPage({
  params,
}: {
  params: { id: number; vacancyId: number }
}) {
  const { data = {} as IVacancy, isLoading: isVacancyLoading } = useVacancyById(
    params.vacancyId
  )

  const { data: incomingRequests = [], isLoading: isIncomingLoading } =
    useVacancyRequests(+params.vacancyId, "INCOMING")

  const { data: sentRequests = [], isLoading: isSentLoading } =
    useVacancyRequests(+params.vacancyId, "SENT")

  const { data: recentRequests = [], isLoading: isRecentLoading } =
    useVacancyRequests(+params.vacancyId, "RECENT")

  return (
    <div className="flex flex-col justify-between gap-3">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-5">
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
            Вакансия
          </h2>
          {isVacancyLoading ? (
            <Skeleton className="h-60" />
          ) : (
            <VacancyCardSmall {...data} className="mt-2" />
          )}
        </div>

        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-semibold transition-colors md:text-3xl">
            Статистика
          </h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            В разработке...
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Входящие запросы</AccordionTrigger>
          <AccordionContent>
            {isIncomingLoading ? (
              <div>Loading</div>
            ) : incomingRequests.length ? (
              <div className="scrollbar grid h-96 gap-5 overflow-y-auto pr-2 md:grid-cols-2">
                {incomingRequests.map((request) => (
                  <Fragment key={generateKey("vacancy-request")}>
                    <VacancyRequestCard
                      request={request}
                      projectId={+params.id}
                      vacancyId={params.vacancyId}
                    />
                  </Fragment>
                ))}
              </div>
            ) : (
              <p>Не найдены</p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Отправленные запросы</AccordionTrigger>
          <AccordionContent>
            {isSentLoading ? (
              <div>Loading</div>
            ) : sentRequests.length ? (
              <div className="scrollbar grid h-96 gap-3 overflow-y-auto pr-2 md:grid-cols-2">
                {sentRequests.map((request) => (
                  <Fragment key={generateKey("vacancy-request")}>
                    <VacancyRequestCard
                      request={request}
                      projectId={+params.id}
                      vacancyId={params.vacancyId}
                    />
                  </Fragment>
                ))}
              </div>
            ) : (
              <p>Не найдены</p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Прошлые запросы</AccordionTrigger>
          <AccordionContent>
            {isRecentLoading ? (
              <div>Loading</div>
            ) : recentRequests.length ? (
              <div className="scrollbar grid h-96 gap-3 overflow-y-auto pr-2 md:grid-cols-2">
                {recentRequests.map((request) => (
                  <Fragment key={generateKey("vacancy-request")}>
                    <VacancyRequestCard
                      request={request}
                      projectId={+params.id}
                      vacancyId={params.vacancyId}
                    />
                  </Fragment>
                ))}
              </div>
            ) : (
              <p>Не найдены</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
