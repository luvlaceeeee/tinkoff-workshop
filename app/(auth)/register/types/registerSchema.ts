import { z } from "zod"

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Обязательное поле" })
      .max(50, { message: "Почта слишком длинная" })
      .email({ message: "Неправильный формат почты" }),
    name: z
      .string()
      .trim()
      .min(1, { message: "Обязательное поле" })
      .min(2, { message: "Имя слишком короткое" })
      .max(50, { message: "Имя слишком длинное" })
      .regex(new RegExp("^[А-Яа-яA-Za-z]+$"), {
        message: "Имя должно состоять из одного слова",
      }),
    surname: z
      .string()
      .trim()
      .min(1, { message: "Обязательное поле" })
      .min(2, { message: "Фамилия слишком короткая" })
      .max(50, { message: "Фамилия слишком длинная" })
      .regex(new RegExp("^[А-Яа-яA-Za-z]+$"), {
        message: "Имя должно состоять из одного слова и не содержать цифр",
      }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Пароль не может быть меньше 6 символов" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Подтверждение пароля обязательно" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  })

export type RegisterSchema = z.infer<typeof registerSchema>
