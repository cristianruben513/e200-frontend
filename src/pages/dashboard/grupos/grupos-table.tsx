import { DataTable } from '@/components/tables/dataTable'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpDown, EditIcon, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import MessageDialog from './components/message-dialog'

import type { Contacto } from '@/types/contacto.interface'
import type { Grupo } from '@/types/grupo.interface'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<Grupo>[] = [
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Id
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
				Nombre
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue('nombre')}</div>,
	},
	{
		accessorKey: 'integrantes',
		header: () => <div>Integrantes</div>,
		cell: ({ row }) => {
			const miembros: Contacto[] = row.getValue('integrantes')

			return <div>{miembros.length}</div>
		},
	},
	{
		id: 'actions',
		header: () => <div className="text-center">Acciones</div>,
		cell: ({ row }) => {
			const id = row.getValue('id')
			const integrantes = row.getValue('integrantes') as Contacto[]

			const celulares = integrantes.map((integrante) => integrante.celular)

			return (
				<div className="flex justify-center items-center gap-4">
					<Link
						to={`/dashboard/editar-grupo/${id}`}
						className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
					>
						<EditIcon className="size-4" />
					</Link>
					<Link
						to={`/dashboard/grupo/participantes/${id}`}
						className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
					>
						<UserPlus className="size-4" />
					</Link>
					<MessageDialog celulares={celulares} />
				</div>
			)
		},
	},
]

export default function GruposTable({ data }: { data: Grupo[] }) {
	return (
		<DataTable
			data={data}
			columns={columns}
			searchPlaceholder="Nombre de grupo"
			searchField="nombre"
		/>
	)
}
