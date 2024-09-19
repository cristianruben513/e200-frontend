import { z } from "zod";

export const ejeTematicoSchema = z.object({
  ejeTematico: z
    .string({
      required_error: "El eje temático es requerido"
    })
    .min(3, {
      message: "El eje temático debe tener al menos 3 caracteres"
    }),
})
