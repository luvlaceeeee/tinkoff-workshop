import { z } from "zod"

export const userProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .min(2, { message: "Имя слишком короткое" }),
  surname: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .min(2, { message: "Фамилия слишком короткая" }),
  contacts: z
    .array(
      z.object({
        value: z.string().url({ message: "Введите правильную ссылку" }),
      })
    )
    .max(5, { message: "Можно добавить максимум 5 контактов" })
    .optional(),
  mainInformation: z.string().max(250).optional(),
})

export type UserProfileSchema = z.infer<typeof userProfileSchema>
