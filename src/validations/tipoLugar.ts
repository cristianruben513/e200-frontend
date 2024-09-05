import { z } from "zod";

export const tipoLugarSchema = z.object({
  tipoLugar: z
    .string({
      required_error: "El tipo de lugar es requerido"
    })
    .min(3, {
      message: "El tipo de lugar debe tener al menos 3 caracteres"
    }),
})