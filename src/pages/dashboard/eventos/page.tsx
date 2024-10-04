import CalendarioEventos from "@/components/calendar/calendar"
import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Evento } from "@/types/evento.interface"
import { Link } from "react-router-dom"
import useSWR from "swr"
import EventosTable from "./eventos-table"

export default function DashboardEventos() {
  const { data, isValidating } = useSWR<Evento[]>("/eventos", fetcher)

  if (isValidating|| !data) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10'>
        <h1 className='text-xl font-bold'>Eventos</h1>

        <Link
          to='/dashboard/nuevo-evento'
          className={cn(buttonVariants(), "w-fit")}
        >
          Agregar nuevo evento
        </Link>
      </div>

      <Tabs defaultValue='lista' className='w-full'>
        <TabsList>
          <TabsTrigger value='agenda'>Vista de Agenda</TabsTrigger>
          <TabsTrigger value='lista'>Vista de Lista</TabsTrigger>
        </TabsList>
        <TabsContent value='agenda'>
          <CalendarioEventos eventos={data} />
        </TabsContent>
        <TabsContent value='lista'>
          <EventosTable data={data} />
        </TabsContent>
      </Tabs>
    </DasboardLayout>
  )
}
