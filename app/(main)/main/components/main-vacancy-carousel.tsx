"use client"

import Link from "next/link"
import { Carousel } from "@mantine/carousel"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { IErrorResponse } from "@/types/interfaces/IErrorResponse"
import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { VacancyCardSmall } from "@/components/cards/vacancy-card-sm"

import { IVacancyResponse } from "../types/IVacancyResponse"
import { CarouselLoader } from "./carousel-loader"

export function MainVacancyCarousel() {
  const { data: vacancies, isLoading } = useQuery<
    IVacancyResponse,
    AxiosError<IErrorResponse>
  >(
    ["10-vacancy"],
    () =>
      $api
        .get<IVacancyResponse>("/positions/vacancies", {
          params: { page: 0, size: 10, dateSort: "DESC" },
        })
        .then((res) => res.data),
    { refetchOnMount: true, refetchInterval: 10000 }
  )

  if (isLoading) return <CarouselLoader />
  if (!vacancies) return <div>Error</div>

  return (
    <Carousel
      height={250}
      slideSize="25%"
      slideGap="md"
      align="start"
      styles={{
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
          color: "var(--foreground)",
          borderColor: "var(--foreground)",
        },
      }}
      breakpoints={[
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
    >
      {vacancies.map((vacancy) => (
        <Carousel.Slide key={generateKey("vacancy-card")}>
          <VacancyCardSmall className="h-[250px]" {...vacancy} />
        </Carousel.Slide>
      ))}
      <Carousel.Slide>
        <Link href={"/searchVacancy"}>
          <div className="flex h-full items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground">
            <p className="font-semibold">Смотреть все резюме</p>
          </div>
        </Link>
      </Carousel.Slide>
    </Carousel>
  )
}
