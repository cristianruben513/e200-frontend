import { DataTable } from '@/components/tables/dataTable'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpDown, EditIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { TipoEvento } from '@/types/tipo-evento.interface'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<TipoEvento>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				ID
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'tipoEvento',
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Tipo de evento
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue('tipoEvento')}</div>,
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
						to={`/dashboard/editar-tipo-evento/${id}`}
					>
						<EditIcon className="size-4" />
					</Link>
				</div>
			)
		},
	},
]

export default function TipoEventosTable({ data }: { data: TipoEvento[] }) {
	return <DataTable data={data} columns={columns} />
}
