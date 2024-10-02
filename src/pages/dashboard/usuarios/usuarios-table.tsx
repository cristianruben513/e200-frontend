import { DataTable } from "@/components/tables/dataTable"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Perfil } from "@/types/perfil.interface"
import { Usuario } from "@/types/usuario.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, EditIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const columns: ColumnDef<Usuario>[] = [
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
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "perfil",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Perfil
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const perfil: Perfil = row.getValue("perfil")
      return <div>{perfil.perfil}</div>
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
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
            to={`/dashboard/editar-usuario/${id}`}
            onClick={() => toast.success("Actualizar")}
          >
            <EditIcon className='size-4' />
          </Link>
        </div>
      )
    },
  },
]

export default function UsuariosTable({ data }: { data: Usuario[] }) {
  return <DataTable data={data} columns={columns} />
}
