import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"
import UsuarioForm from "./form"

export default function DashboardNuevoUsuario() {
  const { data: dataPerfiles } = useSWR("/perfiles", fetcher)

  const isLoading = !dataPerfiles

  if (isLoading) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Registrar nuevo usuario</h1>

      <UsuarioForm dataPerfiles={dataPerfiles} />
    </DasboardLayout>
  )
}
