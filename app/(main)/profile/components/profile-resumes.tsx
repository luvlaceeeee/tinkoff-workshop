"use client"

import { useContext } from "react"
import { Carousel } from "@mantine/carousel"

import { generateKey } from "@/lib/generateKey"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"

import { ProfileContext } from "../context/ProfileContext"

export function ProfileResume() {
  const { resumes } = useContext(ProfileContext)

  return (
    <div>
      {!!resumes.length && (
        <>
          <h1 className="text-2xl font-semibold transition-colors md:text-3xl">
            Активные резюме ({resumes.length})
          </h1>
          <Carousel
            className="max-w-[1120px] pt-3 md:pt-5"
            height={260}
            slideSize="50%"
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
              { maxWidth: "md", slideSize: "100%" },
              { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
            ]}
          >
            {resumes.map(
              ({ direction, createdWhen, description, skills, id }) => (
                <Carousel.Slide key={generateKey("resume-card")}>
                  <ResumeCardSmall
                    trimCount={100}
                    key={generateKey("resume-card")}
                    className="break-all"
                    // className="w-1/3"
                    direction={direction}
                    createdWhen={createdWhen}
                    description={description}
                    skills={skills}
                    id={id}
                  />
                </Carousel.Slide>
              )
            )}
          </Carousel>
        </>
      )}
    </div>
  )
}
