import Loader from '@/components/loader'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import CitasTable from './citas-table'

import type { Cita } from '@/types/cita.interface'

export default function DashboardJornadasSocialCitas() {
	const { folio } = useParams()
	const { data, isLoading } = useSWR<Cita[]>(`/citas/${folio}`, fetcher)

	console.log(data)

	if (isLoading) {
		return (
			<DasboardLayout>
				<Loader />
			</DasboardLayout>
		)
	}

	return (
		<DasboardLayout>
			<div className="flex md:flex-row flex-col gap-4 md:items-center justify-between mb-7">
				<h1 className="text-xl font-bold">Solicitudes de la jornada social</h1>
			</div>

			{data && <CitasTable data={data} />}
		</DasboardLayout>
	)
}
