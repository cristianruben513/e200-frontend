import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import EditarGrupoForm from "./form"

export default function DashboardEditarGrupo() {
  const { id } = useParams()

  const { data } = useSWR(`/grupos/${id}`, fetcher)

  if (!data) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Editar grupo de contactos</h1>

      <EditarGrupoForm dataGrupo={data} />
    </DasboardLayout>
  )
}
