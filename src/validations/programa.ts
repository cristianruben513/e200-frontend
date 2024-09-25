import { z } from "zod";

export const programaSchema = z.object({
  programa: z
    .string({
      required_error: "El nombre del programa es requerido",
    })
    .max(100, {
      message: "El nombre del programa debe tener máximo 150 caracteres",
    }),
  organizacion: z.string({
    required_error: "La organización es requerida",
  }),
})