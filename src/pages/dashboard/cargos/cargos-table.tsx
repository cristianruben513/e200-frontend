import { DataTable } from "@/components/tables/dataTable"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Cargo } from "@/types/cargo.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, EditIcon } from "lucide-react"
import { Link } from "react-router-dom"

const columns: ColumnDef<Cargo>[] = [
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
    accessorKey: "cargo",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cargo
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("cargo")}</div>,
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
            to={`/dashboard/editar-cargo/${id}`}
          >
            <EditIcon className='size-4' />
          </Link>
        </div>
      )
    },
  },
]

export default function CargosTable({ data }: { data: Cargo[] }) {
  return <DataTable data={data} columns={columns} />
}
