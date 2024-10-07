import type { Cargo } from './cargo.interface'
import type { Municipio } from './municipio.interface'
import type { Organizacion } from './organizacion.interface'
import type { Seccion } from './seccion.interface'

export interface Promotor {
	id: number
	nombre: string
	iniciales: string
	genero: string
	afinidad: string
	celular: string | null
	email: string | null
	comentario: string | null
	marcador: string
	municipio: Municipio | null
	organizacion: Organizacion
	cargo: Cargo
	seccion: Seccion | null
}
