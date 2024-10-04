import { DataTable } from "@/components/tables/dataTable"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Evento } from "@/types/evento.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, EditIcon, EyeIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Organizacion } from "@/types/organizacion.interface"

const columns: ColumnDef<Evento>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Id
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "evento",
    header: () => <div>Evento</div>,
    cell: ({ row }) => <div>{row.getValue("evento")}</div>,
  },
  {
    accessorKey: "fechaInicio",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fecha de inicio
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("fechaInicio")}</div>,
  },
  {
    accessorKey: "organizador",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Organizador
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const organizacion: Organizacion = row.getValue("organizador")
      return (
        <div className="flex items-center gap-3">
          <span>{organizacion.organizador}</span>
          {organizacion.logo && (
            <img
              src={organizacion.logo}
              alt='logo'
              className='size-6 rounded object-cover'
            />
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className='text-center'>Acciones</div>,
    cell: ({ row }) => {
      return (
        <div className='flex justify-center items-center gap-4'>
          <Link
            to={`/dashboard/editar-evento/${row.getValue("id")}`}
            className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
          >
            <EditIcon className='size-4' />
          </Link>
          <Link
            to={`/dashboard/eventos/${row.getValue("id")}`}
            className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
          >
            <EyeIcon className='size-4' />
          </Link>
        </div>
      )
    },
  },
]

export default function EventosTable({ data }: { data: Evento[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchField='evento'
      searchPlaceholder='Nombre de evento'
    />
  )
}
