"use client"

import Link from "next/link"
import { Carousel } from "@mantine/carousel"
import { useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"

import { resumesMockMany } from "../../profile/config/mock"
import { CarouselLoader } from "./carousel-loader"

export function MainResumeCarousel() {
  const { data, isLoading } = useQuery(
    ["10-vacancy"],
    () =>
      $api
        .get("/positions/vacancies", {
          params: { page: 0, size: 10, dateSort: "DESC" },
        })
        .then((res) => res.data),
    { refetchOnMount: true, refetchInterval: 10000 }
  )

  if (isLoading) return <CarouselLoader />

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
      {resumesMockMany.map(
        ({ description, direction, skills, createWhen, id }) => (
          <Carousel.Slide key={generateKey("resume-card")}>
            <ResumeCardSmall
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
