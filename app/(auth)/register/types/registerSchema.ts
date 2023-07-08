import { z } from "zod"

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Обязательное поле" })
      .email({ message: "Неправильный формат почты" }),
    name: z
      .string()
      .min(1, { message: "Обязательное поле" })
      .min(2, { message: "Имя слишком короткое" }),
    surname: z
      .string()
      .min(1, { message: "Обязательное поле" })
      .min(2, { message: "Фамилия слишком короткая" }),
    password: z
      .string()
      .min(6, { message: "Пароль не может быть меньше 6 символов" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Подтверждение пароля обязательно" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  })

export type RegisterSchema = z.infer<typeof registerSchema>
