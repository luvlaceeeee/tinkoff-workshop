"use client"

import { IResume } from "@/types/interfaces/IResume"
import { skillMap } from "@/lib/skillMap"
import { Separator } from "@/components/ui/separator"
import { UserProfileSmall } from "@/components/user-profile-sm"

import { useResume } from "../hooks/useResume"

export default function ResumePage({ params }: { params: { id: string } }) {
  const { data: resume = {} as IResume } = useResume(+params.id)
  return (
    <div className="flex justify-between gap-5">
      <div className="flex flex-1 flex-col gap-5 border-r">
        <section className="space-y-3">
          <h2 className="text-3xl font-semibold transition-colors">Навыки</h2>
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((skill) => (
              <p className="rounded-xl border p-2 px-3 text-sm">
                {skillMap(skill)}
              </p>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="text-3xl font-semibold transition-colors">
            Опыт разработки
          </h2>
          <p>{resume.description}</p>
        </section>
      </div>
      <Separator orientation="vertical" />
      <div className="flex-1 space-y-3">
        <h2 className="text-3xl font-semibold transition-colors">
          О пользователе
        </h2>
        <UserProfileSmall {...resume.user} />
      </div>
    </div>
  )
}
