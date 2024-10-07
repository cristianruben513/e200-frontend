import Loader from '@/components/loader'
import { buttonVariants } from '@/components/ui/button'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import CargosTable from './cargos-table'

import type { Cargo } from '@/types/cargo.interface'

export default function DashboardCargos() {
	const { data, isLoading } = useSWR<Cargo[]>('/cargos', fetcher)

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
				<h1 className="text-xl font-bold">Cargos</h1>

				<Link
					to="/dashboard/nuevo-cargo"
					className={cn(buttonVariants(), 'w-fit')}
				>
					Agregar nuevo cargo
				</Link>
			</div>

			{data && <CargosTable data={data} />}
		</DasboardLayout>
	)
}
