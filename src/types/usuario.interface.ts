import type { Perfil } from './perfil.interface'

export interface Usuario {
	id: number
	username: string
	email: string
	telefono: string
	createdAt: string
	deletedAt: string | null
	perfil: Perfil
}
