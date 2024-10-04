import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import useSWR from "swr"
import ContactosTable from "./contactos-table"

export default function DashboardContactos() {
  const { data, isLoading } = useSWR("/contactos", fetcher)

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
        <h1 className='text-xl font-bold'>Contactos</h1>

        <div className="flex flex-row md:items-center gap-2">
          <Link
            to='/dashboard/nuevo-contacto'
            className={cn(buttonVariants(), "w-fit")}
          >
            Agregar contacto
          </Link>
          <Link
            to='/dashboard/contactos/registro-masivo'
            className={cn(buttonVariants(), "w-fit")}
          >
            Registro masivo
          </Link>
        </div>
      </div>

      <ContactosTable data={data} />
    </DasboardLayout>
  )
}
