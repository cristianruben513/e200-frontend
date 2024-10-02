import { DataTable } from "@/components/tables/dataTable"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Contacto } from "@/types/contacto.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, EditIcon } from "lucide-react"
import { Link } from "react-router-dom"
import MessageDialog from "./components/message-dialog"

const columns: ColumnDef<Contacto>[] = [
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
    accessorKey: "celular",
    header: () => <div>Celular</div>,
    cell: ({ row }) => <div>{row.getValue("celular")}</div>,
  },
  {
    id: "actions",
    header: () => <div className='text-center'>Acciones</div>,
    cell: ({ row }) => {
      const id = row.getValue("id")
      const celular = row.getValue("celular") as string

      return (
        <div className='flex justify-center items-center gap-4'>
          <Link
            to={`/dashboard/editar-contacto/${id}`}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <EditIcon className='size-4' />
          </Link>
          <MessageDialog celular={celular} />
        </div>
      )
    },
  },
]

export default function ContactosTable({ data }: { data: Contacto[] }) {
  return <DataTable data={data} columns={columns} searchField="nombre" searchPlaceholder="Nombre del contacto" />
}
