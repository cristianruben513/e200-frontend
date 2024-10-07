import Loader from '@/components/loader'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'
import EventosTable from './invitaciones-table'

import type { Evento } from '@/types/evento.interface'

export default function DashboardInvitaciones() {
	const { data } = useSWR<Evento[]>('/eventos/proximos', fetcher)

	if (!data) {
		return (
			<DasboardLayout>
				<Loader />
			</DasboardLayout>
		)
	}

	return (
		<DasboardLayout>
			<div className="flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10">
				<h1 className="text-xl font-bold">Invitaciones para eventos futuros</h1>
			</div>

			<EventosTable data={data} />
		</DasboardLayout>
	)
}
