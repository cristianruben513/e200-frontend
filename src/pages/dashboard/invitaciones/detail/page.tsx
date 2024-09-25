import Loader from "@/components/loader"
import MainMap from "@/components/mainMap"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { Evento } from "@/types/evento.interface"
import { useParams } from "react-router-dom"
import useSWR from "swr"

import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"

export default function InvitacionDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: eventoData } = useSWR<Evento>(`/eventos/${id}`, fetcher)

  if (!eventoData) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  const latitud = Number(eventoData.latitud.replace(",", "."))
  const longitud = Number(eventoData.longitud.replace(",", "."))

  return (
    <div className='min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4 md:p-8'>
      <div className='max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden'>
        <header className='bg-blue-600 text-white text-center py-5 px-4'>
          <h1 className='text-3xl md:text-4xl font-bold'>
            {eventoData.evento}
          </h1>
        </header>

        <main className='p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='col-span-2 md:col-span-4 h-56'>
            <MainMap
              center={[longitud, latitud]}
              markers={[
                {
                  latitud,
                  longitud,
                  marcador: eventoData?.promotor.marcador,
                  nombreEvento: eventoData?.evento,
                  fechaInicio: eventoData?.fechaInicio,
                },
              ]}
              zoom={14}
            />
          </div>

          <div className='bg-blue-200 rounded-lg p-4 flex flex-col items-center justify-center'>
            <CalendarIcon className='text-blue-600 size-5 mb-2' />
            <span className='font-medium text-blue-800'>
              {eventoData.fechaInicio}
            </span>
          </div>

          <div className='bg-blue-200 rounded-lg p-4 flex flex-col items-center justify-center'>
            <ClockIcon className='text-blue-600 size-5 mb-2' />
            <span className='font-medium text-blue-800'>
              {eventoData.horaInicio}
            </span>
          </div>

          <div className='col-span-2 bg-blue-400 rounded-lg p-4 flex items-center justify-center gap-2'>
            <MapPinIcon className='text-blue-100 size-5' />
            <span className='font-medium text-white text-center'>
              {eventoData.municipio.municipio}
            </span>
          </div>
        </main>

        <footer className='bg-blue-100 text-center py-6 px-4'>
          <p className='text-blue-800 mb-2'>
            Esperamos contar con tu presencia
          </p>
        </footer>
      </div>
    </div>
  )
}
