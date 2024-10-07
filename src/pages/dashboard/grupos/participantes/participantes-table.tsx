import { DataTable } from '@/components/tables/dataTable'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

import type { Contacto } from '@/types/contacto.interface'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<Contacto>[] = [
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
		accessorKey: 'celular',
		header: () => <div>Celular</div>,
		cell: ({ row }) => <div>{row.getValue('celular')}</div>,
	},
]

export default function ParticipantesTable({ data }: { data: Contacto[] }) {
	return <DataTable data={data} columns={columns} />
}
