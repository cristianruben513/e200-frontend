import { DataTable } from "@/components/tables/dataTable"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Organizacion } from "@/types/organizacion.interface"
import { Promotor } from "@/types/promotor.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, EditIcon } from "lucide-react"
import { Link } from "react-router-dom"

const columns: ColumnDef<Promotor>[] = [
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
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "afinidad",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Afinidad
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const afinidad = row.getValue("afinidad")
      return <div>{afinidad === "O" ? "Opositor" : "Afín"}</div>
    },
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
      return <div>{organizacion.organizador}</div>
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
            to={`/dashboard/editar-promotor/${id}`}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <EditIcon className='size-4' />
          </Link>
        </div>
      )
    },
  },
]

export default function DirectorioTable({ data }: { data: Promotor[] }) {
  return <DataTable data={data} columns={columns} />
}
