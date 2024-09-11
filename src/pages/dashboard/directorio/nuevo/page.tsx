import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"
import DirectorioForm from "./form"

export default function DashboardNuevoDirectorio() {
  const { data: dataOrganizadores } = useSWR("/organizaciones", fetcher)
  const { data: dataMunicipios } = useSWR("/municipios", fetcher)
  const { data: dataCargos } = useSWR("/cargos", fetcher)
  const { data: dataSecciones } = useSWR("/secciones", fetcher)

  const isLoading =
    !dataOrganizadores || !dataMunicipios || !dataCargos || !dataSecciones

  if (isLoading) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <div className='md:mx-20'>
        <h1 className='text-xl font-bold mb-7'>
          Registrar entrada en Directorio
        </h1>

        <DirectorioForm
          dataOrganizadores={dataOrganizadores}
          dataMunicipios={dataMunicipios}
          dataCargos={dataCargos}
          dataSecciones={dataSecciones}
        />
      </div>
    </DasboardLayout>
  )
}
