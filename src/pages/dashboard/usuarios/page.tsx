import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import useSWR from "swr"
import UsuariosTable from "./usuarios-table"

export default function DashboardUsuarios() {
  const { data, isLoading } = useSWR("/usuarios", fetcher)

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
        <h1 className='text-xl font-bold'>Usuarios</h1>

        <Link
          to='/dashboard/nuevo-usuario'
          className={cn(buttonVariants(), "w-fit")}
        >
          Agregar usuario
        </Link>
      </div>

      <UsuariosTable dataUsuarios={data} />
    </DasboardLayout>
  )
}
