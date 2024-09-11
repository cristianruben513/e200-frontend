import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Promotor } from "@/types/promotor.interface"
import { Link } from "react-router-dom"
import useSWR from "swr"
import DirectorioTable from "./directorio-table"

export default function DashboardDirectorio() {
  const { data, isLoading } = useSWR<Promotor[]>("/directorios", fetcher)

  if (isLoading || !data) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <div className='md:mx-20'>
        <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10'>
          <h1 className='text-xl font-bold'>Directorio</h1>

          <Link
            to='/dashboard/nuevo-directorio'
            className={cn(buttonVariants(), "w-fit")}
          >
            Agregar contacto a directorio
          </Link>
        </div>

        <DirectorioTable dataDirectorio={data} />
      </div>
    </DasboardLayout>
  )
}
