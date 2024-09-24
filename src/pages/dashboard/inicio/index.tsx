import FiltroDistritoLocal from "@/components/filtros/filtroDistrito"
import FiltroMunicipio from "@/components/filtros/filtroMunicipio"
import FiltroPromotor from "@/components/filtros/filtroPromotor"
import Loader from "@/components/loader"
import MainMap from "@/components/mainMap"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Evento } from "@/types/evento.interface"
import { Promotor } from "@/types/promotor.interface"
import { useMemo, useState } from "react"
import useSWR from "swr"

export default function DashboardIndex() {
  const { data: eventos, error } = useSWR<Evento[]>("/eventos", fetcher)

  // States for selected filters
  const [promotorSeleccionado, setPromotorSeleccionado] =
    useState<Promotor | null>(null)
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<
    string | null
  >(null)
  const [distritoLocalSeleccionado, setDistritoLocalSeleccionado] = useState<
    number | null
  >(null)

  const [mapView, setMapView] = useState("secciones")

  // Extract unique promotores, municipios, and distritosLocales from the data
  const promotores = useMemo(() => {
    if (!eventos) return []
    const promotoresUnicos = Array.from(
      new Set(eventos.map((evento) => evento.promotor.id))
    ).map(
      (id) => eventos.find((evento) => evento.promotor.id === id)?.promotor
    ) as Promotor[]
    return promotoresUnicos
  }, [eventos])

  const municipios = useMemo(() => {
    if (!eventos) return []
    return Array.from(
      new Set(eventos.map((evento) => evento.municipio.municipio))
    ) as string[]
  }, [eventos])

  const distritosLocales = useMemo(() => {
    if (!eventos) return []
    return Array.from(
      new Set(eventos.map((evento) => evento.seccion.distritoLocal))
    ) as number[]
  }, [eventos])

  // Filter events based on selected filters
  const eventosFiltrados = useMemo(() => {
    if (!eventos) return []

    return eventos.filter((evento) => {
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
  }, [
    eventos,
    promotorSeleccionado,
    municipioSeleccionado,
    distritoLocalSeleccionado,
  ])

  // Create markers for the map
  const markers = useMemo(
    () =>
      eventosFiltrados.map((evento) => ({
        latitud: Number(evento.latitud.replace(",", ".")),
        longitud: Number(evento.longitud.replace(",", ".")),
        marcador: evento.promotor.marcador,
        nombreEvento: evento.evento,
        fechaInicio: evento.fechaInicio,
      })),
    [eventosFiltrados]
  )

  const lat = 20.689728
  const lng = -100.064524

  if (error) return <div>Error al cargar los eventos</div>
  if (!eventos) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <div className='flex flex-col md:flex-row md:items-center justify-between'>
        <h2 className='text-xl font-bold mb-8'>Mapa de eventos</h2>

        <div className='p-3 bg-neutral-100 rounded-xl mb-3'>
          <p className='text-center text-sm font-mono mb-2'>
            Tipo de division de mapa
          </p>
          <div className='flex space-x-2 mt-2 text-sm'>
            <button
              className={cn(
                "px-4 py-1 rounded-md w-full",
                mapView === "secciones" && "bg-blue-500 text-white",
                mapView !== "secciones" && "bg-neutral-200 text-blue-500"
              )}
              onClick={() => setMapView("secciones")}
            >
              Distritos
            </button>
            <button
              className={cn(
                "px-4 py-1 rounded-md w-full",
                mapView === "municipios" && "bg-blue-500 text-white",
                mapView !== "municipios" && "bg-neutral-200 text-blue-500"
              )}
              onClick={() => setMapView("municipios")}
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

      <div className='grid md:grid-cols-2 gap-5'>
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
      </div>

      {mapView === "secciones" ? (
        <div className='h-[530px] mb-10'>
          <p className='mb-3 font-semibold'>Mapa con division por distritos</p>
          <MainMap zoom={9} center={[lng, lat]} markers={markers} />
        </div>
      ) : (
        <div className='h-[530px] mb-10'>
          <p className='mb-3 font-semibold'>Mapa con division por municipios</p>
          <MainMap
            style='mapbox://styles/cristian51310/cm0v4tehl008301nt8ayk0zgi'
            zoom={9}
            center={[lng, lat]}
            markers={markers}
          />
        </div>
      )}
    </DasboardLayout>
  )
}
