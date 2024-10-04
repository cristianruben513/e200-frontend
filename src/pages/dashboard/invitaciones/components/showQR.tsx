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
import { QrCodeIcon, Share2Icon } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

export default function ShowQR({ qrValue }: { qrValue: string }) {
  return (
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
            Obten mas detalles sobre este evento al escaneando el codigo QR
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
  )
}
