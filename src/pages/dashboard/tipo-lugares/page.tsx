import Loader from '@/components/loader'
import { buttonVariants } from '@/components/ui/button'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher' // Importa el fetcher
import { cn } from '@/lib/utils'
import type { TipoLugar } from '@/types/tipo-lugares.interface'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import TipoLugaresTable from './tipo-lugares-table'

export default function DashboardTipoLugares() {
	const { data, isLoading } = useSWR<TipoLugar[]>('/tipo-lugares', fetcher)

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
				<h1 className="text-xl font-bold">Tipos de lugares</h1>

				<Link
					to="/dashboard/nuevo-tipo-lugar"
					className={cn(buttonVariants(), 'w-fit')}
				>
					Agregar nuevo tipo de lugar
				</Link>
			</div>

			{data && <TipoLugaresTable data={data} />}
		</DasboardLayout>
	)
}
