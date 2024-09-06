import axiosInstance from "@/axiosInstance"
import FiltroDistritoLocal from "@/components/filtros/filtroDistrito"
import FiltroMunicipio from "@/components/filtros/filtroMunicipio"
import FiltroPromotor from "@/components/filtros/filtroPromotor"
import MainMap from "@/components/mainMap"
import DasboardLayout from "@/layouts/dashboard"
import { Evento, Promotor } from "@/types/evento.interface"
import { useEffect, useState } from "react"

export default function DashboardIndex() {
  const [data, setData] = useState<Evento[]>([])
  const [promotores, setPromotores] = useState<Promotor[]>([])
  const [municipios, setMunicipios] = useState<string[]>([])
  const [distritosLocales, setDistritosLocales] = useState<number[]>([])
  const [promotorSeleccionado, setPromotorSeleccionado] =
    useState<Promotor | null>(null)
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<
    string | null
  >(null)
  const [distritoLocalSeleccionado, setDistritoLocalSeleccionado] = useState<
    number | null
  >(null)

  const [mapaSeleccionado, setMapaSeleccionado] = useState<
    "secciones" | "municipios"
  >("secciones")

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/eventos")
      setData(response.data)

      const promotoresUnicos = Array.from(
        new Set(response.data.map((evento: Evento) => evento.promotor.id))
      ).map(
        (id) =>
          response.data.find((evento: Evento) => evento.promotor.id === id)
            ?.promotor
      ) as Promotor[]
      setPromotores(promotoresUnicos)

      const municipiosUnicos = Array.from(
        new Set(
          response.data.map((evento: Evento) => evento.municipio.municipio)
        )
      ) as string[]
      setMunicipios(municipiosUnicos)

      const distritosLocalesUnicos = Array.from(
        new Set(
          response.data.map((evento: Evento) => evento.seccion.distritoLocal)
        )
      ) as number[]
      setDistritosLocales(distritosLocalesUnicos)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const eventosFiltrados = data.filter((evento) => {
    const matchPromotor = promotorSeleccionado
      ? evento.promotor.id === promotorSeleccionado.id
      : true
    const matchMunicipio = municipioSeleccionado
      ? evento.municipio.municipio === municipioSeleccionado
      : true
    const matchDistritoLocal = distritoLocalSeleccionado
      ? evento.seccion.distritoLocal === distritoLocalSeleccionado
      : true
    return matchPromotor && matchMunicipio && matchDistritoLocal
  })

  const markers = eventosFiltrados.map((evento) => ({
    latitud: Number(evento.latitud.replace(",", ".")),
    longitud: Number(evento.longitud.replace(",", ".")),
  }))

  const lat = 20.689728
  const lng = -100.064524

  return (
    <DasboardLayout>
      <div className='md:mx-20'>
        <div className='flex flex-col md:flex-row md:items-center justify-between'>
          <h2 className='text-xl font-bold mb-8'>Mapa de eventos</h2>

          <div className='p-4 bg-neutral-100 rounded-xl'>
            <p className="text-center text-sm font-mono mb-2">Tipo de division de mapa</p>
            <div className="flex space-x-2">
              <button
                className={`${
                  mapaSeleccionado === "secciones"
                    ? "bg-blue-500 text-white"
                    : "bg-neutral-200 text-blue-500"
                } px-4 py-2 rounded-md`}
                onClick={() => setMapaSeleccionado("secciones")}
              >
                Secciones
              </button>
              <button
                className={`${
                  mapaSeleccionado === "municipios"
                    ? "bg-blue-500 text-white"
                    : "bg-neutral-200 text-blue-500"
                } px-4 py-2 rounded-md`}
                onClick={() => setMapaSeleccionado("municipios")}
              >
                Municipios
              </button>
            </div>
          </div>
        </div>

        <FiltroPromotor
          promotores={promotores}
          promotorSeleccionado={promotorSeleccionado}
          onPromotorChange={setPromotorSeleccionado}
        />

        <FiltroMunicipio
          municipios={municipios}
          municipioSeleccionado={municipioSeleccionado}
          onMunicipioChange={setMunicipioSeleccionado}
        />

        <FiltroDistritoLocal
          distritosLocales={distritosLocales}
          distritoLocalSeleccionado={distritoLocalSeleccionado}
          onDistritoLocalChange={setDistritoLocalSeleccionado}
        />

        {mapaSeleccionado === "secciones" ? (
          <div className='h-[530px] mb-10'>
            <p className='mb-3 font-semibold'>
              Mapa con division por secciones
            </p>
            <MainMap zoom={9} center={[lng, lat]} markers={markers} />
          </div>
        ) : (
          <div className='h-[530px] mb-10'>
            <p className='mb-3 font-semibold'>
              Mapa con division por municipios
            </p>
            <MainMap zoom={9} center={[lng, lat]} markers={markers} />
          </div>
        )}
      </div>
    </DasboardLayout>
  )
}
