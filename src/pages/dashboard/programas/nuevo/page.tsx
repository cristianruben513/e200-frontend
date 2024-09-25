import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"
import DirectorioForm from "./form"

export default function DashboardNuevoPrograma() {
  const { data: dataOrganizadores } = useSWR("/organizaciones", fetcher)

  if (!dataOrganizadores) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>
        Registrar nuevo programa
      </h1>

      <DirectorioForm dataOrganizadores={dataOrganizadores} />
    </DasboardLayout>
  )
}
