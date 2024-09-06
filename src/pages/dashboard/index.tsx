import axiosInstance from "@/axiosInstance"
import Loader from "@/components/loader"
import MainMap from "@/components/mainMap"
import DasboardLayout from "@/layouts/dashboard"
import { Evento, Promotor } from "@/types/evento.interface"
import { useEffect, useState } from "react"

export default function DashboardIndex() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Evento[]>([])
  const [promotores, setPromotores] = useState<Promotor[]>([])
  const [promotorSeleccionado, setPromotorSeleccionado] =
    useState<Promotor | null>(null)


  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get("/eventos")
      setData(response.data)

      // Extrae los promotores únicos de los eventos
      const promotoresUnicos = Array.from(
        new Set(response.data.map((evento: Evento) => evento.promotor.id))
      ).map(
        (id) =>
          response.data.find((evento: Evento) => evento.promotor.id === id)
            ?.promotor
      ) as Promotor[]

      setPromotores(promotoresUnicos)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Filtra los eventos según el promotor seleccionado
  const eventosFiltrados = promotorSeleccionado
    ? data.filter((evento) => evento.promotor.id === promotorSeleccionado.id)
    : data

  // Mapea los eventos filtrados y convierte latitud y longitud a número
  const markers = eventosFiltrados.map((evento) => ({
    latitud: Number(evento.latitud.replace(",", ".")),
    longitud: Number(evento.longitud.replace(",", ".")),
  }))

  // Centro del mapa en Querétaro
  const lat = 20.689728
  const lng = -100.064524

  if (loading || !promotores.length || !data) {
    return <Loader />
  }

  return (
    <DasboardLayout>
      <div className='md:mx-20'>
        <h2 className='text-xl font-bold mb-8'>Mapa de eventos</h2>

        {/* Select para filtrar por promotor */}
        <div className='mb-4'>
          <label
            htmlFor='promotor-select'
            className='block text-sm font-medium text-gray-700'
          >
            Filtrar por promotor:
          </label>
          <select
            id='promotor-select'
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            value={promotorSeleccionado?.id || ""}
            onChange={(e) => {
              const selectedId = Number(e.target.value)
              const selectedPromotor =
                promotores.find((promotor) => promotor.id === selectedId) ||
                null
              setPromotorSeleccionado(selectedPromotor)
            }}
          >
            <option value=''>Todos los promotores</option>
            {promotores.map((promotor) => (
              <option key={promotor.id} value={promotor.id}>
                {promotor.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Mapa */}
        <div className='h-[530px]'>
          <MainMap zoom={9} center={[lng, lat]} markers={markers} />
        </div>
      </div>
    </DasboardLayout>
  )
}
