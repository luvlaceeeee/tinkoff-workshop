import { useContext } from "react"
import { Carousel } from "@mantine/carousel"

import { generateKey } from "@/lib/generateKey"
import { ProjectCardSmall } from "@/components/cards/project-card-sm"

import { UserProfileContext } from "../context/UserProfileContext"

//TODO Вынести в отдельный компонент

export function UserProfileProjects() {
  const { projects } = useContext(UserProfileContext)

  return (
    <div>
      {!!projects.length && (
        <>
          <h1 className="text-3xl font-semibold transition-colors">
            Проекты ({projects.length})
          </h1>
          <Carousel
            className="pt-5"
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
            {projects.map(
              ({
                title,
                theme,
                membersCount,
                description,
                status,
                createdWhen,
                id,
              }) => (
                <Carousel.Slide key={generateKey("resume-card")}>
                  <ProjectCardSmall
                    key={generateKey("resume-card")}
                    id={id}
                    createdWhen={createdWhen}
                    title={title}
                    theme={theme}
                    status={status}
                    description={description}
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
