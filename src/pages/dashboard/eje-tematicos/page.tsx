import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { EjeTematico } from "@/types/eje-tematico.interface"
import { Link } from "react-router-dom"
import useSWR from "swr"
import EjeTematicosTable from "./eje-tematicos-table"

export default function DashboardEjeTematicos() {
  const { data, isLoading } = useSWR<EjeTematico[]>("/eje-tematicos", fetcher)

  if (isLoading) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-7'>
        <h1 className='text-xl font-bold'>Ejes tematicos</h1>

        <Link
          to='/dashboard/nuevo-eje-tematico'
          className={cn(buttonVariants(), "w-fit")}
        >
          Agregar nuevo tipo de eje tematico
        </Link>
      </div>

      {data && <EjeTematicosTable dataEjeTematicos={data} />}
    </DasboardLayout>
  )
}
