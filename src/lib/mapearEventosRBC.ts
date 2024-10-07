import type { Evento } from '@/types/evento.interface'

export function mapearEventos(eventos: Evento[]) {
	return eventos.map((evento) => ({
		id: evento.id,
		title: `${evento.evento}`,
		start: new Date(`${evento.fechaInicio}T${evento.horaInicio}`),
		end: evento.fechaFin
			? new Date(`${evento.fechaFin}T${evento.horaFin}`)
			: new Date(`${evento.fechaInicio}T${evento.horaInicio}`),
		description: evento.descripcion,
	}))
}
