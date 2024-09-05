import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es requerido"
    })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres"
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida"
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres"
    })
})