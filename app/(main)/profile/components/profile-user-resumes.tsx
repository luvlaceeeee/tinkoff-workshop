"use client"

import { Carousel } from "@mantine/carousel"
import { useQuery } from "@tanstack/react-query"

import { IResume } from "@/types/interfaces/IResume"
import $api from "@/config/axios"
import { generateKey } from "@/lib/generateKey"
import { ResumeCardSmall } from "@/components/cards/resume-card-sm"

interface ProfileUserResumeProps {
  resumes: IResume[]
}

export function ProfileUserResume() {
  const { data: resumes = [], isLoading } = useQuery(["user-resumes"], () =>
    $api.get<IResume[]>("/resumes").then((res) => res.data)
  )

  return (
    <div>
      <h2 className="text-3xl font-semibold transition-colors">
        Активные резюме: {!isLoading && resumes.length}
      </h2>
      {!isLoading ? (
        // <div className="flex w-full gap-6 overflow-auto pt-5">
        <Carousel
          className="max-w-[1120px] pt-5"
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
          {/* </div> */}
        </Carousel>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}
