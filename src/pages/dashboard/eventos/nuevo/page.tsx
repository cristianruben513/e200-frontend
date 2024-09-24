import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"
import NewEventForm from "./form"

export default function DashboardNuevoEvento() {
  const { data: tipoLugar } = useSWR("/tipo-lugares", fetcher)
  const { data: tipoEventos } = useSWR("/tipo-eventos", fetcher)
  const { data: organizadores } = useSWR("/organizaciones", fetcher)
  const { data: ejesTematicos } = useSWR("/eje-tematicos", fetcher)
  const { data: impactos } = useSWR("/impactos", fetcher)
  const { data: municipios } = useSWR("/municipios", fetcher)
  const { data: secciones } = useSWR("/secciones", fetcher)
  const { data: promotores } = useSWR("/directorios", fetcher)

  const isLoading =
    !tipoLugar ||
    !tipoEventos ||
    !organizadores ||
    !ejesTematicos ||
    !impactos ||
    !municipios ||
    !secciones ||
    !promotores

  if (isLoading) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Registrar evento</h1>

      <NewEventForm
        dataTipoLugares={tipoLugar}
        dataTipoEventos={tipoEventos}
        dataOrganizadores={organizadores}
        dataEjesTematicos={ejesTematicos}
        dataImpactos={impactos}
        dataMunicipios={municipios}
        dataSecciones={secciones}
        dataPromotores={promotores}
      />
    </DasboardLayout>
  )
}
