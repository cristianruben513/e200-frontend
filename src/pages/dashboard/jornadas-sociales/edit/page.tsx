import DasboardLayout from "@/layouts/dashboard"
import EditarTipoLugarForm from "./form"
import Loader from "@/components/loader"
import { useParams } from "react-router-dom"
import useSWR from "swr"  
import { fetcher } from "@/lib/fetcher"

export default function DashboardEditarTipoEvento() {
  const { id } = useParams()
  const { data, isValidating } = useSWR(`/tipo-eventos/${id}`, fetcher)

  if (isValidating || !data) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Editar jornada social</h1>
      <EditarTipoLugarForm dataJornadaSocial={data} />
    </DasboardLayout>
  )
}
