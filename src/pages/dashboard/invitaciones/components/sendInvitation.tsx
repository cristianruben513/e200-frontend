/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/axiosInstance"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { fetcher } from "@/lib/fetcher"
import { Grupo } from "@/types/grupo.interface"
import {
  EyeIcon,
  Loader,
  LoaderIcon,
  SendHorizonalIcon,
  Share2Icon,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import useSWR from "swr"

export default function EnviarInvitacionesAGrupos({
  eventId,
}: {
  eventId: string
}) {
  const { data } = useSWR<Grupo[]>("/grupos", fetcher)
  const [loading, setLoading] = useState(false)

  if (!data) {
    return (
      <div className='flex justify-center items-center size-full'>
        <Loader />
      </div>
    )
  }

  const handleSendInvitation = async (grupoId: string) => {
    try {
      setLoading(true)
      // Hacer la petición al backend para enviar las invitaciones
      const response = await axiosInstance.post(
        `/invitaciones/grupo/invitaciones`,
        {
          idEvento: eventId,
          idGrupo: grupoId,
        }
      )
      console.log(response.data.message)
    } catch (error: any) {
      console.error('Error al enviar las invitaciones:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          Enviar invitacion
          <Share2Icon className='size-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enviar invitacion a grupos</AlertDialogTitle>
          <AlertDialogDescription>
            Envia la invitacion a los grupos que desees
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='grid gap-3 w-full my-3'>
          {data.map((grupo) => (
            <div
              key={grupo.id}
              className='flex justify-between items-center bg-neutral-200 p-2 px-6 rounded-lg'
            >
              <div>
                <span className='font-bold text-sm'>{grupo.nombre}</span>{" "}
                <span className='text-xs font-light'>
                  ({grupo.integrantes.length} int.)
                </span>
              </div>
              <div className='flex gap-2'>
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                  to={`/dashboard/grupo/participantes/${grupo.id}`}
                >
                  <EyeIcon className='size-4' />
                </Link>
                <Button
                  onClick={() => handleSendInvitation(grupo.id.toString())}
                  variant='outline'
                  size='icon'
                >
                  {loading ? (
                    <LoaderIcon className='size-4 animate-spin' />
                  ) : (
                    <SendHorizonalIcon className='size-4' />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-red-500 text-white hover:text-white hover:bg-red-600 hover:shadow-red-200'>
            Cerrar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
