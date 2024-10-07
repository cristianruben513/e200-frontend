import type { Link } from '@/components/dashboard/links'

// Filtrar enlaces según el perfil del usuario
export function filterLinksByProfile(links: Link[], userPerfil: string) {
	return links.filter(
		(link) =>
			userPerfil === 'Administrador' ||
			(userPerfil === 'Supervisor' && link.perfil !== 'Administrador') ||
			(userPerfil === 'Staff' && link.perfil === 'Staff'),
	)
}