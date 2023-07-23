"use client"

import { Carousel } from "@mantine/carousel"
import { useContext } from "react"

import { ResumeCardSmall } from "@/components/cards/resume-card-sm"
import { generateKey } from "@/lib/generateKey"

import { UserProfileContext } from "../context/UserProfileContext"

//TODO Вынести в отдельный компонент

export function UserProfileResume() {
  const { resumes } = useContext(UserProfileContext)

  return (
    <div>
      {!!resumes.length && (
        <>
          <h1 className="text-2xl md:text-3xl font-semibold transition-colors">
            Активные резюме ({resumes.length})
          </h1>
          <Carousel
            className=" pt-5"
            height={250}
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
