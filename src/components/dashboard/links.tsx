import {
	IoAddCircleOutline,
	IoAt,
	IoBookOutline,
	IoBriefcaseOutline,
	IoBusinessOutline,
	IoCalendarOutline,
	IoCameraOutline,
	IoDocumentTextOutline,
	IoHomeOutline,
	IoIdCardOutline,
	IoMegaphoneOutline,
	IoOptionsOutline,
	IoPeopleCircleOutline,
	IoPeopleOutline,
	IoQrCodeOutline,
	IoReaderOutline,
	IoSchoolOutline,
} from 'react-icons/io5'
import { categorias } from './categorias'

import type { IconType } from 'react-icons/lib'

export interface Link {
	href: string
	categoria: {
		label: string
		icon: any
	}
	icon: IconType
	label: string
	perfil: string
}

export const links: Link[] = [
	{
		href: '/dashboard',
		categoria: categorias.AGENDA,
		icon: IoHomeOutline,
		label: 'Inicio',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/eventos',
		categoria: categorias.AGENDA,
		icon: IoCalendarOutline,
		label: 'Eventos',
		perfil: 'Staff',
	},
	{
		href: '/dashboard/nueva-foto',
		categoria: categorias.AGENDA,
		icon: IoCameraOutline,
		label: 'Agregar foto',
		perfil: 'Staff',
	},
	{
		href: '/dashboard/directorio',
		categoria: categorias.ADMINSTRACION,
		icon: IoAt,
		label: 'Directorio',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/tipo-lugares',
		categoria: categorias.ADMINSTRACION,
		icon: IoBusinessOutline,
		label: 'Tipos de lugares',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/cargos',
		categoria: categorias.ADMINSTRACION,
		icon: IoBriefcaseOutline,
		label: 'Cargos',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/eje-tematicos',
		categoria: categorias.ADMINSTRACION,
		icon: IoPeopleCircleOutline,
		label: 'Ejes Tematicos',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/tipo-eventos',
		categoria: categorias.ADMINSTRACION,
		icon: IoMegaphoneOutline,
		label: 'Tipos de eventos',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/usuarios',
		categoria: categorias.ADMINSTRACION,
		icon: IoIdCardOutline,
		label: 'Usuarios',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/menus',
		categoria: categorias.ADMINSTRACION,
		icon: IoOptionsOutline,
		label: 'Opciones de menú',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/programas',
		categoria: categorias.ADMINSTRACION,
		icon: IoSchoolOutline,
		label: 'Programas sociales',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/eventos/excel',
		categoria: categorias.ADMINSTRACION,
		icon: IoDocumentTextOutline,
		label: 'Carga masiva',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/nueva-encuesta',
		categoria: categorias.ENCUESTAS,
		icon: IoAddCircleOutline,
		label: 'Nueva encuesta',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/contactos',
		categoria: categorias.INVITACIONES,
		icon: IoBookOutline,
		label: 'Contactos',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/grupos',
		categoria: categorias.INVITACIONES,
		icon: IoPeopleOutline,
		label: 'Grupos',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/invitaciones',
		categoria: categorias.INVITACIONES,
		icon: IoReaderOutline,
		label: 'Invitaciones',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/asistencia',
		categoria: categorias.INVITACIONES,
		icon: IoQrCodeOutline,
		label: 'Asistencia',
		perfil: 'Administrador',
	},
	{
		href: '/dashboard/jornadas-sociales',
		categoria: categorias.JORNADAS_SOCIALES,
		icon: IoQrCodeOutline,
		label: 'Eventos',
		perfil: 'Administrador',
	},
]
