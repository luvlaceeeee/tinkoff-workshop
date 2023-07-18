import { z } from "zod"

export const resumeSchema = z
  .object({
    description: z
      .string()
      .min(1, "Обязательное поле")
      .max(200, "Не больше 200 символов"),
    direction: z.string({ required_error: "Обязательное поле" }),
    skills: z
      .array(
        z.object({
          value: z.string().min(1, "Нельзя оставить пустой навык"),
        })
      )
      .min(1, { message: "Необходимо добавить хотя бы 1 навык" }),
  })
  .refine(
    ({ skills }) => {
      const skillsArray = skills.map((skill) => skill.value)
      return skillsArray.length === new Set(skillsArray).size
    },
    {
      path: ["skills"],
      message: "Нельзя повторять навыки",
    }
  )

export type ResumeSchema = z.infer<typeof resumeSchema>
