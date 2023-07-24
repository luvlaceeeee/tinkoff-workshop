import Link from "next/link"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import { concatStrings } from "@/lib/concatStrings"
import { convertDate } from "@/lib/convertDate"
import { useAcceptRequest } from "@/hooks/useAcceptRequest"
import { useRejectRequest } from "@/hooks/useRejectRequest"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { LinkTitle } from "@/components/link-title"
import { queryClient } from "@/components/providers"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"

import { IVacancyRequest } from "../types/IVacancyRequest"

export function VacancyRequestCard({
  request,
  projectId,
  vacancyId,
}: {
  request: IVacancyRequest
  projectId: number
  vacancyId: number
}) {
  const { resume, createdWhen, id, isInvite, status, coverLetter } = request
  const router = useRouter()

  const { mutate: acceptMutate, isLoading: isAcceptLoading } = useAcceptRequest(
    id,
    {
      onSuccess: () => {
        toast({
          variant: "accept",
          title: "Запрос принят",
          description: "Пользователь теперь в проекте, вакансия удалена",
        })
        queryClient.invalidateQueries(["project-members", projectId])
        router.replace(`/project/${projectId}`)
        queryClient.invalidateQueries(["project-vacancies", projectId])
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
  const { mutate: rejectMutate, isLoading: isRejectLoading } = useRejectRequest(
    id,
    {
      onSuccess: () => {
        toast({
          variant: "accept",
          title: "Запрос отклонен",
          description: "Запрос перемещен в прошлые",
        })
        queryClient.invalidateQueries(["vacancy-requests", +vacancyId])
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

  const Footer = () => {
    if (status.statusName !== "IN_CONSIDERATION")
      return status.description === "Request is declined" ? (
        <p className="text-destructive">Отклонен</p>
      ) : (
        <p className="text-accept">Принят</p>
      )

    if (isInvite) {
      return <p>В ожидании ответа</p>
    } else {
      return (
        <>
          <Button
            variant={"destructive"}
            loading={isRejectLoading || isAcceptLoading}
            onClick={() => rejectMutate()}
            disabled={isRejectLoading || isAcceptLoading}
          >
            Отклонить
          </Button>
          <Button
            variant={"main"}
            onClick={() => acceptMutate()}
            loading={isAcceptLoading || isRejectLoading}
            disabled={isAcceptLoading || isRejectLoading}
          >
            Принять
          </Button>
        </>
      )
    }
  }

  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border bg-secondary/20 p-3 px-4 hover:bg-secondary/30 md:px-5">
      <Link href={`/resume/${resume.id}`} className="cursor-pointer space-y-2">
        <header className="flex items-center justify-between border-b pb-2 md:pb-3">
          <div>
            <LinkTitle
              href={`/resume/${resume.id}`}
              className="text-lg font-semibold md:text-xl"
            >
              {resume.direction.description}
            </LinkTitle>
            <LinkTitle
              href={`/profile/${resume.user.id}`}
              className="block text-sm font-normal md:text-base"
            >
              {concatStrings(" ", resume.user.name, resume.user.surname)}
            </LinkTitle>
          </div>
          <p className="text-xs text-muted-foreground md:text-sm">
            Отправлен {convertDate(createdWhen)}
          </p>
        </header>

        <SkillsSection
          skills={resume.skills}
          titleSize="text-base md:text-lg"
          className="space-y-1"
          isCard
        />

        <AboutSection
          title="Описание резюме"
          description={resume.description}
          titleSize="text-base md:text-lg"
          className="space-y-0 md:space-y-1"
        />
        {coverLetter && (
          <AboutSection
            title="Сопроводительное письмо"
            description={coverLetter}
            titleSize="text-base md:text-lg"
            className="space-y-0 md:space-y-1"
          />
        )}
      </Link>

      <footer className="flex items-center justify-end gap-3 border-t pt-3">
        <Link href={`/resume/${resume.id}`} target="_blank">
          <Button variant={"outline"} asChild>
            Посмотреть резюме
          </Button>
        </Link>
        <Footer />
      </footer>
    </div>
  )
}
