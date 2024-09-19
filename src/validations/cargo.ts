import { z } from "zod";

export const cargoSchema = z.object({
  cargo: z
    .string({
      required_error: "El nombre del cargo es requerido"
    })
    .min(3, {
      message: "El nombre del cargo debe tener al menos 3 caracteres"
    }),
})