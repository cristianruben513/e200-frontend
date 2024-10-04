import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import EditarDirectorioForm from "./form"

export default function DashboardEditarPrograma() {
  const { id } = useParams()

  const { data: dataPrograma } = useSWR(`/programas/${id}`, fetcher)
  const { data: dataOrganizadores } = useSWR("/organizaciones", fetcher)

  const isLoading = !dataOrganizadores || !dataPrograma

  if (isLoading) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>
        Editar programa social
      </h1>

      <EditarDirectorioForm
        dataOrganizadores={dataOrganizadores}
        dataPrograma={dataPrograma}
      />
    </DasboardLayout>
  )
}
