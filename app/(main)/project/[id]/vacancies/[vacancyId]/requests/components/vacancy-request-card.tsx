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
}: {
  request: IVacancyRequest
  projectId: number
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
        queryClient
          .invalidateQueries([
            "project-members",
            "project-vacancies",
            projectId,
          ])
          .then(() => router.replace(`/project/${projectId}`))
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
        queryClient.invalidateQueries(["vacancy-requests", id])
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
      return <p>{status.description}</p>

    if (isInvite) {
      return <p>В ожидании ответа</p>
    } else {
      return (
        <>
          <Button
            variant={"destructive"}
            loading={isRejectLoading}
            onClick={() => rejectMutate()}
            disabled={isRejectLoading}
          >
            Отклонить
          </Button>
          <Button
            variant={"main"}
            onClick={() => acceptMutate()}
            loading={isAcceptLoading}
            disabled={isAcceptLoading}
          >
            Принять
          </Button>
        </>
      )
    }
  }

  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border p-3 px-4 md:px-5">
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
