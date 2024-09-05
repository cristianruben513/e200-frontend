import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const fotoSchema = z.object({
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "El tamaño máximo de la imagen es de 5MB")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "El formato de la imagen no es válido"
    ),
  evento: z
    .string({
      required_error: "El evento es requerido"
    }),
})