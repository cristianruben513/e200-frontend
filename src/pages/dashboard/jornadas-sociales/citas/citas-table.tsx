import { DataTable } from '@/components/tables/dataTable'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpDown, EditIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Cita } from '@/types/cita.interface'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<Cita>[] = [
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
		accessorKey: 'turno',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Numero de turno
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => <div className='uppercase'>{row.getValue('turno')}</div>,
	},
	{
		accessorKey: 'nombre',
		header: () => <div>Nombre Solicitante</div>,
		cell: ({ row }) => <div>{row.getValue('nombre')}</div>,
	},
	{
		id: 'actions',
		header: () => <div className="text-center">Acciones</div>,
		cell: ({ row }) => {
			const id = row.getValue('id')

			return (
				<div className="flex justify-center items-center gap-4">
					<Link
						className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
						to={`/dashboard/editar-jornada-social/${id}`}
					>
						<EditIcon className="size-4" />
					</Link>
				</div>
			)
		},
	},
]

export default function CitasTable({ data }: { data: Cita[] }) {
	return <DataTable data={data} columns={columns} />
}
