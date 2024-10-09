import Loader from '@/components/loader'
import { buttonVariants } from '@/components/ui/button'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import TipoEventosTable from './tipo-lugares-table'

import type { TipoEvento } from '@/types/tipo-evento.interface'

export default function DashboardTipoEventos() {
	const { data, isLoading } = useSWR<TipoEvento[]>('/jornadas-sociales', fetcher)

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
				<h1 className="text-xl font-bold">Jornadas Sociales</h1>

				<Link to="/dashboard/nuevo-tipo-evento" className={cn(buttonVariants(), 'w-fit')}>
					Registrar nuevas jornadas sociales
				</Link>
			</div>

			{data && <TipoEventosTable data={data} />}
		</DasboardLayout>
	)
}
