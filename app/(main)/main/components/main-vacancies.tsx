"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { MainVacancyCarousel } from "./main-vacancy-carousel"

export function MainVacancies() {
  return (
    <section className="space-y-3">
      <div className="flex flex-col justify-between gap-1 md:flex-row">
        <h2 className="text-lg font-semibold transition-colors md:text-3xl">
          Недавние вакансии
        </h2>
        <div className="flex justify-between gap-3">
          <Link href={"/projects/choose"}>
            <Button variant={"main"} size={"sm"}>
              Создать вакансию
            </Button>
          </Link>
          <Link href={"/search/vacancies"}>
            <Button variant={"secondary"} size={"sm"}>
              Смотреть все вакансии
            </Button>
          </Link>
        </div>
      </div>
      <MainVacancyCarousel />
    </section>
  )
}
