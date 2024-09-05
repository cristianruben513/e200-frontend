import { z } from "zod";

export const directorioSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre es requerido",
    })
    .max(100, {
      message: "El nombre del evento debe tener máximo 150 caracteres",
    }),
  iniciales: z
    .string({
      required_error: "Las iniciales son requeridas",
    }),
  genero: z.string({
    required_error: "El género es requerido",
  }),
  afinidad: z.string({
    required_error: "La afinidad es requerida",
  }),
  organizacion: z.string({
    required_error: "La organización es requerida",
  }),
  cargo: z.string({
    required_error: "El cargo es requerido",
  }),
  celular: z.string().optional(),
  email: z.string().email({ message: "Correo no válido" }).optional(),
  municipio: z.string().optional(),
  seccion: z.string().optional(),
  comentarios: z.string().optional(),
})