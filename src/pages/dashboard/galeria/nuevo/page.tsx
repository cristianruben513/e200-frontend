import Loader from '@/components/loader'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import type { Evento } from '@/types/evento.interface'
import useSWR from 'swr'
import NuevaFotoForm from './form'

export default function DashboardNuevaFoto() {
	const { data: eventosData } = useSWR<Evento[]>('/eventos', fetcher)

	if (!eventosData) {
		return (
			<DasboardLayout>
				<Loader />
			</DasboardLayout>
		)
	}

	return (
		<DasboardLayout>
			<h1 className="text-xl font-bold mb-7">Subir foto</h1>

			<NuevaFotoForm dataEventos={eventosData} />
		</DasboardLayout>
	)
}
