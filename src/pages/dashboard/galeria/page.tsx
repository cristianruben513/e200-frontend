import Loader from '@/components/loader'
import { buttonVariants } from '@/components/ui/button'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import { cn } from '@/lib/utils'
import type { Foto } from '@/types/foto.interface'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

export default function DashboardGaleria() {
	const { data: dataFotos } = useSWR<Foto[]>('/fotos', fetcher)

	if (!dataFotos) {
		return (
			<DasboardLayout>
				<Loader />
			</DasboardLayout>
		)
	}

	return (
		<DasboardLayout>
			<div className="flex md:flex-row flex-col gap-4 md:items-center justify-between mb-7">
				<h1 className="text-xl font-bold">Galeria</h1>

				<Link
					to="/dashboard/nueva-foto"
					className={cn(buttonVariants(), 'w-fit')}
				>
					Agregar nueva foto
				</Link>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{dataFotos?.map((foto) => (
					<img
						key={foto.id}
						src={foto.url}
            alt={`Imagen del evento ${foto.id}`}
						className="aspect-square rounded-xl shadow-lg object-cover"
					/>
				))}
			</div>
		</DasboardLayout>
	)
}
