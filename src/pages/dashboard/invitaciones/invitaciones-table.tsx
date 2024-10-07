import { DataTable } from '@/components/tables/dataTable'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import EnviarInvitacionesAGrupos from './components/sendInvitation'

import type { Evento } from '@/types/evento.interface'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<Evento>[] = [
	{
		accessorKey: 'id',
		header: () => <div>ID</div>,
		cell: ({ row }) => <div>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'evento',
		header: () => <div>Evento</div>,
		cell: ({ row }) => <div>{row.getValue('evento')}</div>,
	},
	{
		accessorKey: 'fechaInicio',
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Fecha de inicio
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue('fechaInicio')}</div>,
	},
	{
		id: 'actions',
		header: () => <div className="text-center">Acciones</div>,
		cell: ({ row }) => {
			const eventId = row.getValue('id')

			return (
				<div className="flex justify-center gap-2">
					<EnviarInvitacionesAGrupos eventId={eventId as string} />
				</div>
			)
		},
	},
]

export default function EventosTable({ data }: { data: Evento[] }) {
	return <DataTable data={data} columns={columns} searchField="evento" searchPlaceholder="Nombre de evento" />
}
