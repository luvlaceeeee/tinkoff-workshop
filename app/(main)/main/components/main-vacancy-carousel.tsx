"use client"

import { Carousel } from "@mantine/carousel"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Link from "next/link"

import { VacancyCardSmall } from "@/components/cards/vacancy-card-sm"
import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { IErrorResponse } from "@/types/interfaces/IErrorResponse"

import { IVacancySearchResponse } from "../../search/vacancies/types/IVacancySearchResponse"
import { CarouselLoader } from "./carousel-loader"

export function MainVacancyCarousel() {
  const { data: vacancies, isLoading } = useQuery<
    IVacancySearchResponse,
    AxiosError<IErrorResponse>
  >(
    ["10-vacancy"],
    () =>
      $api
        .get<IVacancySearchResponse>("/positions/search", {
          params: { page: 0, size: 10, dateSort: "DESC" },
        })
        .then((res) => res.data),
    { refetchOnMount: true, refetchInterval: 10000 }
  )

  if (isLoading) return <CarouselLoader />
  if (!vacancies) return <div>Error</div>

  return (
    <Carousel
      height={260}
      slideSize="32.9%"
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
        { maxWidth: "md", slideSize: "32.9%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
    >
      {vacancies.content.map((vacancy) => (
        <Carousel.Slide key={generateKey("vacancy-card")}>
          <VacancyCardSmall className="h-[250px]" {...vacancy} />
        </Carousel.Slide>
      ))}
      <Carousel.Slide>
        <Link href={"/search/vacancies"}>
          <div className="flex h-full items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground">
            <p className="font-semibold">Смотреть все резюме</p>
          </div>
        </Link>
      </Carousel.Slide>
    </Carousel>
  )
}
