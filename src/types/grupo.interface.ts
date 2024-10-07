import type { Contacto } from './contacto.interface'

export interface Grupo {
	id: number
	nombre: string
	integrantes: Contacto[]
}
