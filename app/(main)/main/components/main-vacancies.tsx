"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { MainVacancyCarousel } from "./main-vacancy-carousel"

export function MainVacancies() {
  return (
    <section className="space-y-3">
      <div className="flex flex-col justify-between gap-1 md:flex-row">
        <h2 className="text-lg font-semibold transition-colors md:text-3xl">
          Недавние Вакансии
        </h2>
        <div className="flex justify-between gap-3">
          <Button variant={"main"} size={"sm"}>
            <Link href={"/projects/choose"}>Создать вакансию</Link>
          </Button>
          <Button variant={"secondary"} size={"sm"}>
            <Link href={"/search/vacancies"}>Смотреть все вакансии</Link>
          </Button>
        </div>
      </div>
      <MainVacancyCarousel />
    </section>
  )
}
