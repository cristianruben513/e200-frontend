import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es requerido",
    })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "El correo no es válido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  confirmPassword: z
    .string({
      required_error: "La confirmación de la contraseña es requerida",
    }),
  equipo: z
    .enum(["E200", "Gobierno"], {
      required_error: "El equipo es requerido",
      invalid_type_error: "Equipo inválido",
    }),
})
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });
