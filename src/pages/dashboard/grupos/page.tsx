import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import useSWR from "swr"
import DirectorioTable from "./grupos-table"

export default function DashboardGrupos() {
  const { data, isLoading } = useSWR("/grupos", fetcher)

  if (isLoading || !data) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  console.log(data)

  return (
    <DasboardLayout>
      <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10'>
        <h1 className='text-xl font-bold'>Grupos de contactos</h1>

        <Link
          to='/dashboard/nuevo-grupo'
          className={cn(buttonVariants(), "w-fit")}
        >
          Crear nuevo grupo
        </Link>
      </div>

      <DirectorioTable data={data} />
    </DasboardLayout>
  )
}
