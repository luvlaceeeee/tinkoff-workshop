import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Обязательное поле" })
    .email({ message: "Неправильный формат почты" }),
  password: z.string().min(1, { message: "Обязательное поле" }),
})

export type LoginSchema = z.infer<typeof loginSchema>
