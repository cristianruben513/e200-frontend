import type { Organizacion } from './organizacion.interface'

export interface Programa {
	id: number
	programa: string
	organizacion: Organizacion
}
