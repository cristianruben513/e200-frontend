import { DataTable } from "@/components/tables/dataTable"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Evento } from "@/types/evento.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, QrCodeIcon, Share2Icon } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

const columns: ColumnDef<Evento>[] = [
  {
    accessorKey: "id",
    header: () => <div>ID</div>,
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
    id: "actions",
    header: () => <div className='text-center'>Acciones</div>,
    cell: ({ row }) => {
      const eventId = row.getValue("id")
      //const qrValue = "https://e200-frontend.pages.dev/invitacion/" + eventId
      const qrValue = "http://localhost:5173/invitacion/" + eventId

      return (
        <div className='flex justify-center'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline'>
                <span className='md:block hidden'>Mostrar Invitacion</span>
                <QrCodeIcon className='size-4 ml-2' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Invitacion a evento</AlertDialogTitle>
                <AlertDialogDescription>
                  Obten mas detalles sobre este evento al escaneando el codigo
                  QR
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className='flex justify-center items-center my-6'>
                <div className='p-4 rounded-xl bg-neutral-200'>
                  <QRCodeSVG value={qrValue} size={230} />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>
                  Compartir invitacion
                  <Share2Icon className='size-4 ml-2' />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]

export default function EventosTable({ eventos }: { eventos: Evento[] }) {
  return <DataTable data={eventos} columns={columns} />
}
