import { z } from "zod"

export const resumeSchema = z.object({
  description: z
    .string({ required_error: "Обязательное поле" })
    .max(200, "Не больше 200 символов"),
  direction: z.string({ required_error: "Обязательное поле" }),
  skills: z.array(
    z.object({
      value: z.string(),
    }),
    { required_error: "Необходимо добавить хотя бы 1 навык" }
  ),
  addSkills: z.string().max(30).optional(),
})

export type ResumeSchema = z.infer<typeof resumeSchema>
