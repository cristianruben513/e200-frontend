import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Programa } from "@/types/programa.interface"
import { Link } from "react-router-dom"
import useSWR from "swr"
import DirectorioTable from "./programas-table"

export default function DashboardProgramas() {
  const { data, isLoading } = useSWR<Programa[]>("/programas", fetcher)

  if (isLoading || !data) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10'>
        <h1 className='text-xl font-bold'>Programas</h1>

        <Link
          to='/dashboard/nuevo-programa'
          className={cn(buttonVariants(), "w-fit")}
        >
          Registrar programa
        </Link>
      </div>

      <DirectorioTable data={data} />
    </DasboardLayout>
  )
}
