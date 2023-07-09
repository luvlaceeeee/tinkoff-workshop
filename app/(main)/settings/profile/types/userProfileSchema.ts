import { z } from "zod"

export const userProfileSchema = z.object({
  name: z
    .string({ required_error: "Обязательное поле" })
    .min(2, { message: "Имя слишком короткое" }),
  surname: z
    .string({ required_error: "Обязательное поле" })
    .min(2, { message: "Фамилия слишком короткая" }),
  // email: z
  //   .string({ required_error: "Обязательное поле" })
  //   .email({ message: "Неправильный формат почты" }),
  contacts: z
    .array(
      z.object({
        value: z.string().url({ message: "Введите правильную ссылку" }),
      })
    )
    .optional(),
  // contacts: z.string().url().array().max(5),
  mainInformation: z.string().max(250).optional(),
})

export type UserProfileSchema = z.infer<typeof userProfileSchema>
