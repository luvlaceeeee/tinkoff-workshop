"use client"

import Link from "next/link"
import { Carousel } from "@mantine/carousel"
import { useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { VacancyCardSmall } from "@/components/cards/vacancy-card-sm"

import { vacanciesMockMany } from "../../profile/config/mock"

export function MainVacancyCarousel() {
  const { data, isLoading } = useQuery(
    ["10-vacancy"],
    () =>
      $api.get("/positions/vacancies", {
        params: { page: 0, size: 10, dateSort: "DESC" },
      }),
    { refetchOnMount: true, refetchInterval: 10000 }
  )
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
      {vacanciesMockMany.map(
        ({ description, direction, skills, createWhen, id }) => (
          <Carousel.Slide key={generateKey("vacancy-card")}>
            <VacancyCardSmall
              className="h-[250px]"
              direction={direction}
              createWhen={createWhen}
              description={description}
              skills={skills}
              id={id}
            />
          </Carousel.Slide>
        )
      )}
      <Carousel.Slide>
        <Link href={"/searchResume"}>
          <div className="flex h-full items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground">
            <p className="font-semibold">Смотреть все резюме</p>
          </div>
        </Link>
      </Carousel.Slide>
    </Carousel>
  )
}
