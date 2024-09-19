import { z } from "zod";

export const tipoEventoSchema = z.object({
  tipoEvento: z
    .string({
      required_error: "El tipo de evento es requerido"
    })
    .min(3, {
      message: "El tipo de evento debe tener al menos 3 caracteres"
    }),
})