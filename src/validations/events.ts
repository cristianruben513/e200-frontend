import { z } from "zod";

//const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Formato HH:mm

export const eventSchema = z.object({
  evento: z
    .string({
      required_error: "El nombre del evento es requerido",
    })
    .max(150, {
      message: "El nombre del evento debe tener máximo 150 caracteres",
    }),
  descripcion: z
    .string()
    .max(500, {
      message: "La descripción debe tener máximo 500 caracteres",
    })
    .optional(),
  tpLugar: z.string({
    required_error: "El tipo de lugar es requerido",
  }),
  lugar: z
    .string({
      required_error: "El lugar del evento es requerido",
    })
    .max(150, {
      message: "El lugar del evento debe tener máximo 150 caracteres",
    }),
  fechaInicio: z.date({
    required_error: "La fecha de inicio es requerida",
  }),
  horaInicio: z
    .string({
      required_error: "La hora de inicio es requerida",
    }),
  fechaFin: z.date().optional(),
  horaFin: z.string().optional(),
  organizador: z.string({
    required_error: "El organizador es requerido",
  }),
  tpEvento: z.string({
    required_error: "El tipo de evento es requerido",
  }),
  ejeTematico: z.string({
    required_error: "El eje temático es requerido",
  }),
  impacto: z.string({
    required_error: "El impacto es requerido",
  }),
  promotor: z.string({
    required_error: "El promotor es requerido",
  }),
  asistentesEsperados: z.string({
    required_error: "El número de asistentes esperados es requerido",
  }),
  statusEvento: z.string({
    required_error: "El status del evento es requerido",
  }),
  latitud: z.string({
    required_error: "La latitud es requerida",
  }),
  longitud: z.string({
    required_error: "La longitud es requerida",
  }),
  municipio: z.string({
    required_error: "El municipio es requerido",
  }),
  seccion: z.string({
    required_error: "La sección es requerida",
  }),
  localidad: z.string().optional(),
  asistentesReales: z.string().optional(),
  calificacion: z.string().optional(),
  observaciones: z.string().optional(),
  urlRedesSociales: z.string().optional(),
  urlImagenPromocional: z.string().optional(),
})