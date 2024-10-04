import { DataTable } from "@/components/tables/dataTable"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Organizacion } from "@/types/organizacion.interface"
import { Programa } from "@/types/programa.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, EditIcon } from "lucide-react"
import { Link } from "react-router-dom"

const columns: ColumnDef<Programa>[] = [
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
    accessorKey: "programa",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Programa
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("programa")}</div>,
  },
  {
    accessorKey: "organizacion",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Organización
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const organizacion: Organizacion = row.getValue("organizacion")
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
      const id = row.getValue("id")

      return (
        <div className='flex justify-center items-center gap-4'>
          <Link
            to={`/dashboard/editar-programa/${id}`}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <EditIcon className='size-4' />
          </Link>
        </div>
      )
    },
  },
]

export default function DirectorioTable({ data }: { data: Programa[] }) {
  return <DataTable data={data} columns={columns} />
}
