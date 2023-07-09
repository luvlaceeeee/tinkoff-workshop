"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { MainVacancyCarousel } from "./main-vacancy-carousel"

export function MainVacancies() {
  return (
    <section className="space-y-3">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold transition-colors">
          Недавние Вакансии
        </h2>
        <div className="space-x-3">
          <Button variant={"main"} asChild>
            <Link href={"/createVacancy"}>Создать вакансию</Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href={"/searchVacancy"}>Смотреть все вакансию</Link>
          </Button>
        </div>
      </div>
      <MainVacancyCarousel />
    </section>
  )
}
