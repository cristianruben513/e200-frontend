import { Card } from "@/components/card"
import Loader from "@/components/loader"
import MainMap from "@/components/mainMap"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { Evento } from "@/types/evento.interface"
import { Foto } from "@/types/foto.interface"
import { useParams } from "react-router-dom"
import useSWR from "swr"

export default function DashboardEventoDetail() {
  const { id } = useParams<{ id: string }>()

  const { data: eventoData } = useSWR<Evento>(`/eventos/${id}`, fetcher)
  const { data: fotosData } = useSWR<Foto[]>(`/fotos/eventos/${id}`, fetcher)

  if (!eventoData || !fotosData) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  const latitud = Number(eventoData.latitud.replace(",", "."))
  const longitud = Number(eventoData.longitud.replace(",", "."))

  return (
    <DasboardLayout>
     
      <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10'>
        <h1 className='text-xl font-bold'>{eventoData?.evento}</h1>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <Card title='Tipo Evento'>{eventoData?.tipoEvento.tipoEvento}</Card>
        <Card title='Organizador'>{eventoData?.organizador.organizador}</Card>
      </div>

      <div className='grid md:grid-cols-4 gap-4 mt-4'>
        <div className='p-2 px-4 rounded-xl bg-neutral-100 grid gap-1 md:col-span-2'>
          <span className='font-bold text-lg'>Promotor</span>
          <span>{eventoData?.promotor.nombre}</span>
        </div>

        <Card title='Cargo'>{eventoData?.promotor.cargo.cargo}</Card>
        <Card title='Impacto'>{eventoData?.impacto.impacto}</Card>
      </div>

      <div className='grid md:grid-cols-2 gap-5 mt-5'>
        <section className='aspect-square h-full w-full bg-green-50 rounded-xl'>
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
        </section>

        <section className='grid grid-cols-2 gap-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='aspect-square rounded-xl shadow-lg'>
              {fotosData[index] ? (
                <img
                  className='w-full h-full object-cover rounded-xl'
                  src={fotosData[index].url}
                  alt={`Foto ${index + 1}`}
                />
              ) : (
                <div className='w-full h-full bg-gray-300 rounded-xl' />
              )}
            </div>
          ))}
        </section>
      </div>

      <div className='grid md:grid-cols-2 gap-4 mt-4'>
        <Card title='Fecha y Hora de inicio'>{eventoData?.horaInicio}</Card>
        <Card title='Fecha y Hora de termino'>{eventoData?.horaFin}</Card>
      </div>

    </DasboardLayout>
  )
}
