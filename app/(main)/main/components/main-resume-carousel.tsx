"use client"

import { Carousel } from "@mantine/carousel"
import { Link } from "lucide-react"

import { generateKey } from "@/lib/generateKey"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"

import { resumesMockMany } from "../../profile/config/mock"

export function MainResumeCarousel() {
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
