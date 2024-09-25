import { z } from "zod";

export const contactoSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  genero: z.string({
    required_error: "El género es requerido",
  }),
  fechaNacimiento: z.date({
    required_error: "La fecha de nacimiento es requerida",
  }),
  ine: z.string().optional(),
  celular: z.string({ message: "El celular es requerido" }),
  email: z.string().email({ message: "Correo no válido" }).optional(),
  domicilio: z.string({
    required_error: "El domicilio es requerida",
  }),
})