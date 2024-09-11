import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import UsuarioForm from "./form"

export default function DashboardEditarUsuario() {
  const { id } = useParams()

  const { data: dataPerfiles } = useSWR("/perfiles", fetcher)
  const { data: dataUsuario } = useSWR(`/usuarios/${id}`, fetcher)

  const isLoading = !dataPerfiles || !dataUsuario

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
        <h1 className='text-xl font-bold mb-7'>Editar usuario</h1>

        <UsuarioForm dataUsuario={dataUsuario} dataPerfiles={dataPerfiles} />
      </div>
    </DasboardLayout>
  )
}
