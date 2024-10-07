import DasboardLayout from "@/layouts/dashboard"
import EditarCargoForm from "./form"
import { fetcher } from "@/lib/fetcher"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import Loader from "@/components/loader"

export default function DashboardEditarCargo() {
  const { id } = useParams()
	const { data, isValidating } = useSWR(`/tipo-lugares/${id}`, fetcher)

  if (isValidating || !data) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Editar Cargo</h1>

      <EditarCargoForm dataCargo={data} />
    </DasboardLayout>
  )
}
