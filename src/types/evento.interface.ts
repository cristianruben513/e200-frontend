import type { EjeTematico } from './eje-tematico.interface'
import type { Impacto } from './impacto.interface'
import type { Municipio } from './municipio.interface'
import type { Organizacion } from './organizacion.interface'
import type { Perfil } from './perfil.interface'
import type { Promotor } from './promotor.interface'
import type { Seccion } from './seccion.interface'
import type { TipoEvento } from './tipo-evento.interface'
import type { TipoLugar } from './tipo-lugares.interface'

export interface Evento {
	id: number
	evento: string
	descripcion: string
	lugar: string
	statusEvento: string
	fechaInicio: string // Formato 'YYYY-MM-DD'
	horaInicio: string // Formato 'HH:MM:SS'
	fechaFin: string | null
	horaFin: string | null
	asistentesEsperados: number
	asistentesReales: number | null
	latitud: string // Latitud como cadena de texto
	longitud: string // Longitud como cadena de texto
	localidad: string | null
	calificacion: number | null
	observaciones: string | null
	urlRedesSociales: string | null
	urlImagenPromocional: string | null
	creador: Creador
	tipoLugar: TipoLugar
	tipoEvento: TipoEvento
	organizador: Organizacion
	ejeTematico: EjeTematico
	impacto: Impacto
	municipio: Municipio
	seccion: Seccion
	promotor: Promotor
}

export interface Creador {
	id: number
	username: string
	email: string
	telefono: string
	createdAt: string // Formato ISO 8601
	deletedAt: string | null
	perfil: Perfil
}
