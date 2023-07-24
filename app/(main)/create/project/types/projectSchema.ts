import { z } from "zod"

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Обязательное поле" })
    .max(30, { message: "Имя слишком длинное" }),
  theme: z
    .string()
    .trim()
    .min(1, { message: "Обязательное поле" })
    .max(100, { message: "Тема слишком длинная" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Обязательное поле" })
    .max(200, { message: "Не больше 200 символов" }),
  direction: z.string({ required_error: "Обязательное поле" }),
  status: z.string({ required_error: "Обязательное поле" }),
  contacts: z
    .array(
      z.object({
        link: z
          .string()
          .trim()
          .min(1, "Нельзя оставить пустую ссылку")
          .url({ message: "Неверный формат ссылки" }),
        description: z
          .string()
          .trim()
          .min(1, "Обязательно поле")
          .max(50, { message: "Описание слишком длинное" }),
      })
    )
    .optional(),
})

export type ProjectSchema = z.infer<typeof projectSchema>
