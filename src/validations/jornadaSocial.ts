import { z } from 'zod'

export const jornadaSocialSchema = z.object({
	nombre: z.string({
		required_error: 'El nombre es requerido',
	}),
	descripcion: z.string().optional(),
	folio: z
		.string({
			required_error: 'El folio es requerido',
		})
		.min(6, {
			message: 'El folio debe tener al menos 6 caracteres',
		}),
	fechaInicio: z.date({
		required_error: 'La fecha de inicio es requerida',
	}),
})
