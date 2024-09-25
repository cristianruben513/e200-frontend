import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { Evento } from "@/types/evento.interface"
import useSWR from "swr"
import EventosTable from "./invitaciones-table"

export default function DashboardInvitaciones() {
  const { data, isLoading } = useSWR<Evento[]>("/invitaciones", fetcher)

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
        <h1 className='text-xl font-bold'>Invitaciones para eventos</h1>
      </div>

      <EventosTable eventos={data} />
    </DasboardLayout>
  )
}
