/* eslint-disable react-hooks/exhaustive-deps */

import axiosInstance from "@/axiosInstance"
import { Card } from "@/components/card"
import Loader from "@/components/loader"
import MainMap from "@/components/mainMap"
import DasboardLayout from "@/layouts/dashboard"
import { Evento } from "@/types/evento.interface"
import { Foto } from "@/types/foto.interface"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function DashboardEventoDetail() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Evento | null>(null)
  const [photos, setPhotos] = useState<Foto[]>([])

  const { id } = useParams<{ id: string }>()

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/eventos/${id}`)
      setData(response.data)

      const responsePhotos = await axiosInstance.get(`/fotos/eventos/${id}`)
      setPhotos(responsePhotos.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading || !data || !photos) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  const latitud = Number(data.latitud.replace(",", "."))
  const longitud = Number(data.longitud.replace(",", "."))

  console.log(latitud, longitud)

  return (
    <DasboardLayout>
      <div className='md:mx-20'>
        <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10'>
          <h1 className='text-xl font-bold'>{data?.evento}</h1>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Card title='Tipo Evento'>{data?.tipoEvento.tipoEvento}</Card>
          <Card title='Organizador'>{data?.organizador.organizador}</Card>
          <Card title='Tipo Evento'>{data?.tipoEvento.tipoEvento}</Card>
          <Card title='Organizador'>{data?.organizador.organizador}</Card>
        </div>

        <div className='grid md:grid-cols-4 gap-4 mt-4'>
          <div className='p-2 px-4 rounded-xl bg-neutral-100 grid gap-1 md:col-span-2'>
            <span className='font-bold text-lg'>Promotor</span>
            <span>{data?.promotor.nombre}</span>
          </div>

          <Card title='Cargo'>{data?.promotor.cargo.cargo}</Card>
          <Card title='Impacto'>{data?.impacto.impacto}</Card>
        </div>

        <div className='grid md:grid-cols-2 gap-5 mt-5'>
          <section className='aspect-square h-full w-full bg-green-50 rounded-xl'>
            <MainMap
              center={[longitud, latitud]}
              markers={[
                {
                  latitud,
                  longitud,
                  marcador: data?.promotor.marcador,
                  nombreEvento: data?.evento,
                  fechaInicio: data?.fechaInicio,
                },
              ]}
              zoom={14}
            />
          </section>

          <section className='grid grid-cols-2 gap-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='aspect-square rounded-xl shadow-lg'>
                {photos[index] ? (
                  <img
                    className='w-full h-full object-cover rounded-xl'
                    src={photos[index].url}
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
          <Card title='Fecha y Hora de inicio'>{data?.horaInicio}</Card>
          <Card title='Fecha y Hora de termino'>{data?.horaFin}</Card>
        </div>
      </div>
    </DasboardLayout>
  )
}
