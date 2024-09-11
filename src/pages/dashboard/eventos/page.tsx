import CalendarioEventos from "@/components/calendar/calendar"
import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Evento } from "@/types/evento.interface"
import { useState } from "react"
import { Link } from "react-router-dom"
import useSWR from "swr"
import EventosTable from "./eventos-table"

export default function DashboardEventos() {
  const [viewType, setViewType] = useState("agenda")

  const { data, isLoading } = useSWR<Evento[]>("/eventos", fetcher)

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
          <h1 className='text-xl font-bold'>Eventos</h1>

          <Link
            to='/dashboard/nuevo-evento'
            className={cn(buttonVariants(), "w-fit")}
          >
            Agregar nuevo evento
          </Link>
        </div>

        <div className='p-4 bg-neutral-100 rounded-xl mb-5'>
          <div className='flex space-x-2'>
            <button
              className={cn(
                "px-4 py-2 rounded-md w-full",
                viewType === "agenda" && "bg-blue-500 text-white",
                viewType !== "agenda" && "bg-neutral-200 text-blue-500"
              )}
              onClick={() => setViewType("agenda")}
            >
              Agenda
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-md w-full",
                viewType === "lista" && "bg-blue-500 text-white",
                viewType !== "lista" && "bg-neutral-200 text-blue-500"
              )}
              onClick={() => setViewType("lista")}
            >
              Lista
            </button>
          </div>
        </div>

        {viewType === "agenda" && <CalendarioEventos eventos={data} />}
        {viewType === "lista" && <EventosTable dataEventos={data} />}
      </div>
    </DasboardLayout>
  )
}
