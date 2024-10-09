import Loader from '@/components/loader'
import { buttonVariants } from '@/components/ui/button'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import TipoEventosTable from './jornadas-sociales-table'

import type { JornadaSocial } from '@/types/jornada-social.interface'

export default function DashboardJornadasSocilaes() {
	const { data, isLoading } = useSWR<JornadaSocial[]>('/jornadas-sociales', fetcher)

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

				<Link
					to="/dashboard/nueva-jornada-social"
					className={cn(buttonVariants(), 'w-fit')}
				>
					Registrar jornada social
				</Link>
			</div>

			{data && <TipoEventosTable data={data} />}
		</DasboardLayout>
	)
}
