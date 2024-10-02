import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import EditarDirectorioForm from "./form"

export default function DashboardEditarContacto() {
  const { id } = useParams()
  const { data, isLoading } = useSWR(`/contactos/${id}`, fetcher)

  if (!data || isLoading) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Editar contacto</h1>

      <EditarDirectorioForm dataContacto={data} />
    </DasboardLayout>
  )
}
