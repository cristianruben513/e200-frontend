import Background from "@/components/background"
import { fetcher } from "@/lib/fetcher"
import { formatTime } from "@/lib/formatTime"
import { obtenerSaludo } from "@/lib/obtenerSaludo"
import { Contacto } from "@/types/contacto.interface"
import { Evento } from "@/types/evento.interface"
import { CalendarIcon, ClockIcon, LoaderIcon, MapPinIcon } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import { EventMap } from "./eventMap"
import { useEffect } from "react"

interface Invitacion {
  token: string
  evento: Evento
  contacto: Contacto
}

export default function InvitacionDetail() {
  const { token } = useParams<{ token: string }>()

  const { data, error, isLoading } = useSWR<Invitacion>(
    `/invitaciones/${token}/qr`,
    fetcher
  )

  useEffect(() => {
    if (data) {
      document.title = `Invitación para ${data.evento.evento}`
    }
  }, [data])

  if (isLoading || !data || !token) {
    return (
      <main className='min-h-screen flex items-center justify-center p-6 md:p-8'>
        <Background />
        <LoaderIcon className='animate-spin size-6' />
      </main>
    )
  }

  if (error) {
    return (
      <main className='min-h-screen flex items-center justify-center p-6 md:p-8'>
        <Background />
        <p>
          Error al cargar la invitación. Por favor, inténtalo de nuevo más
          tarde.
        </p>
      </main>
    )
  }

  const eventoData = data.evento

  const latitud = Number(eventoData.latitud.replace(",", "."))
  const longitud = Number(eventoData.longitud.replace(",", "."))

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6 md:p-8'>
      <Background />

      <div className='max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden'>
        <header className='bg-blue-600 text-white text-center py-5 px-4'>
          <h1 className='text-2xl md:text-4xl font-bold'>
            {eventoData.evento}
          </h1>
        </header>

        <main className='p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='col-span-2 md:col-span-4'>
            <span className='font-bold block mb-2'>
              Hola, {obtenerSaludo() + " " + data.contacto.nombre}
            </span>
            <span>
              Aqui tienes los detalles de tu invitación, al llegar al evento
              muestra este código QR
            </span>
          </div>
          <div className='p-4 rounded-xl bg-neutral-200 w-full flex items-center justify-center col-span-2'>
            <QRCodeSVG value={token} size={200} />
          </div>

          <div className='col-span-2 h-56'>
            <EventMap
              latitud={latitud}
              longitud={longitud}
              eventoData={eventoData}
            />
          </div>

          <div className='bg-blue-200 rounded-lg p-2 py-3 gap-2 flex items-center justify-center'>
            <CalendarIcon className='text-blue-600 size-4' />
            <span className='font-medium text-blue-800'>
              {eventoData.fechaInicio}
            </span>
          </div>

          <div className='bg-blue-200 rounded-lg p-2 py-3 gap-2 flex items-center justify-center'>
            <ClockIcon className='text-blue-600 size-4' />
            <span className='font-medium text-blue-800'>
              {formatTime(eventoData.horaInicio)}
            </span>
          </div>

          <div className='col-span-2 bg-blue-400 rounded-lg p-4 flex items-center justify-center gap-2'>
            <MapPinIcon className='text-blue-100 size-5' />
            <span className='font-medium text-white text-center'>
              {eventoData.municipio.municipio}
            </span>
          </div>
        </main>

        <footer className='bg-blue-100 text-center py-3 px-4'>
          <p className='text-blue-800'>Esperamos contar con tu presencia</p>
        </footer>
      </div>
    </div>
  )
}
