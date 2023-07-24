"use client"

import Link from "next/link"
import { Carousel } from "@mantine/carousel"
import { useQuery } from "@tanstack/react-query"

import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"

import { IResumesSearchResponse } from "../../search/resumes/types/IResumesSearchResponse"
import { CarouselLoader } from "./carousel-loader"

export function MainResumeCarousel() {
  const { data: resumes = { content: [] }, isLoading } = useQuery(
    ["10-resumes"],
    () =>
      $api
        .get<IResumesSearchResponse>("resumes/search", {
          params: { page: 0, size: 10, dateSort: "DESC" },
        })
        .then((res) => res.data),
    { refetchOnMount: true }
  )

  if (isLoading) return <CarouselLoader />

  return (
    <Carousel
      height={260}
      slideSize="32.5%"
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
        { maxWidth: "md", slideSize: "32.5%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
    >
      {resumes.content.map(
        ({ description, direction, skills, createdWhen, id }) => (
          <Carousel.Slide key={generateKey("resume-card")}>
            <ResumeCardSmall
              className="h-[250px]"
              direction={direction}
              createdWhen={createdWhen}
              description={description}
              skills={skills}
              id={id}
            />
          </Carousel.Slide>
        )
      )}
      <Carousel.Slide>
        <Link href={"/search/resumes"}>
          <div className="flex h-full items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground">
            <p className="font-semibold">Смотреть все резюме</p>
          </div>
        </Link>
      </Carousel.Slide>
    </Carousel>
  )
}
