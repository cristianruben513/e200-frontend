import type { Municipio } from './municipio.interface'

export interface Seccion {
	id: number
	seccion: string
	distritoLocal: number
	distritoFederal: number
	prioridad: 'S' | 'N'
	municipio: Municipio
}
