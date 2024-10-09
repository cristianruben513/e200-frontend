import { DataTable } from '@/components/tables/dataTable'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpDown, EditIcon, EyeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { JornadaSocial } from '@/types/jornada-social.interface'
import type { ColumnDef } from '@tanstack/react-table'
import ShowQR from './components/showQR'

const columns: ColumnDef<JornadaSocial>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				ID
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'nombre',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Jornada Social
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue('nombre')}</div>,
	},
	{
		accessorKey: 'folio',
		header: () => <div>Jornada Social</div>,
		cell: ({ row }) => <div className="uppercase">{row.getValue('folio')}</div>,
	},
	{
		id: 'actions',
		header: () => <div className="text-center">Acciones</div>,
		cell: ({ row }) => {
			const id = row.getValue('id')
			const folio = row.getValue('folio')

			return (
				<div className="flex justify-center items-center gap-4">
					<Link
						className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
						to={`/dashboard/editar-jornada-social/${id}`}
					>
						<EditIcon className="size-4" />
					</Link>
					<Link
						className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
						to={`/dashboard/jornada-social/citas/${folio}`}
					>
						<EyeIcon className="size-4" />
					</Link>
					<ShowQR
						qrValue={`https://wa.me/14155238886?text=Hola,%20estoy%20interesado%20en%20la%20jornada%20social%20con%20el%20folio:%20${folio}%20¿Podrías%20ayudarme%20con%20más%20información?`}
					/>
				</div>
			)
		},
	},
]

export default function JornadasSocialesTable({ data }: { data: JornadaSocial[] }) {
	return (
		<DataTable
			data={data}
			columns={columns}
			searchField="nombre"
			searchPlaceholder="nombre"
		/>
	)
}
