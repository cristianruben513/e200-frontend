import { z } from "zod";

export const grupoSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre del grupo es requerido"
    })
    .min(3, {
      message: "El nombre del grupo debe tener al menos 3 caracteres"
    }),
})