import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import EditarEventForm from "./form"

export default function DashboardEditarEvento() {
  const { id } = useParams()

  const { data: dataTipoLugar } = useSWR("/tipo-lugares", fetcher)
  const { data: dataTipoEventos } = useSWR("/tipo-eventos", fetcher)
  const { data: dataOrganizadores } = useSWR("/organizaciones", fetcher)
  const { data: dataEjesTematicos } = useSWR("/eje-tematicos", fetcher)
  const { data: dataImpactos } = useSWR("/impactos", fetcher)
  const { data: dataMunicipios } = useSWR("/municipios", fetcher)
  const { data: dataSecciones } = useSWR("/secciones", fetcher)
  const { data: dataPromotores } = useSWR("/directorios", fetcher)
  
  const { data: dataEvento } = useSWR(`/eventos/${id}`, fetcher)

  const isLoading =
    !dataTipoLugar ||
    !dataTipoEventos ||
    !dataOrganizadores ||
    !dataEjesTematicos ||
    !dataImpactos ||
    !dataMunicipios ||
    !dataSecciones ||
    !dataPromotores ||
    !dataEvento

  if (isLoading) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Actualizar evento</h1>
      
      <EditarEventForm
        dataTipoLugares={dataTipoLugar}
        dataTipoEventos={dataTipoEventos}
        dataOrganizadores={dataOrganizadores}
        dataEjesTematicos={dataEjesTematicos}
        dataImpactos={dataImpactos}
        dataMunicipios={dataMunicipios}
        dataSecciones={dataSecciones}
        dataPromotores={dataPromotores}
        dataEvento={dataEvento}
      />
    </DasboardLayout>
  )
}
