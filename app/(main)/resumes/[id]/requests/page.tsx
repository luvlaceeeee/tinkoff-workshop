"use client"

import { useResumeById } from "@/app/(main)/resume/hooks/useResumeById"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { IResume } from "@/types/interfaces/IResume"

import { ResumeRequestCard } from "./components/resume-request-card"
import { useResumeRequests } from "./hooks/useResumeRequests"

export default function ResumeRequestsPage({
  params,
}: {
  params: { id: number }
}) {
  const { data: resume = {} as IResume, isLoading: isResumeLoading } =
    useResumeById(params.id)

  const { data: incomingRequests = [], isLoading: isIncomingLoading } =
    useResumeRequests(params.id, "INCOMING")

  const { data: sentRequests = [], isLoading: isSentLoading } =
    useResumeRequests(params.id, "SENT")

  const { data: recentRequests = [], isLoading: isRecentLoading } =
    useResumeRequests(params.id, "RECENT")

  return (
    <div className="flex flex-col justify-between gap-3">
      <div className="flex justify-between gap-5">
        <div className="flex-1 space-y-1">
          <h2 className="text-3xl font-semibold transition-colors">Резюме</h2>
          {isResumeLoading ? (
            <Skeleton className="h-60" />
          ) : (
            <ResumeCardSmall {...resume} />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-3xl font-semibold transition-colors">
            Статистика
          </h2>
          <p className="text-sm text-muted-foreground">В разработке...</p>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Входящие запросы</AccordionTrigger>
          <AccordionContent>
            {isIncomingLoading ? (
              <div>Loading</div>
            ) : incomingRequests.length ? (
              <div className="scrollbar grid h-96 grid-cols-2 gap-5 overflow-y-auto pr-2">
                {incomingRequests.map((request) => (
                  <ResumeRequestCard request={request} />
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
              <div className="scrollbar grid h-96 grid-cols-2 gap-3 overflow-y-auto pr-2">
                {sentRequests.map((request) => (
                  <ResumeRequestCard request={request} />
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
              <div className="scrollbar grid h-96 grid-cols-2 gap-3 overflow-y-auto pr-2">
                {recentRequests.map((request) => (
                  <ResumeRequestCard request={request} />
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
