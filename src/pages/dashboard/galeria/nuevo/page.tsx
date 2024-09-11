import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { fetcher } from "@/lib/fetcher"
import { Evento } from "@/types/evento.interface"
import useSWR from "swr"
import NuevaFotoForm from "./form"

export default function DashboardNuevaFoto() {
  const { data: eventosData } = useSWR<Evento[]>("/eventos", fetcher)

  if (!eventosData) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <div className='md:mx-20'>
        <h1 className='text-xl font-bold mb-7'>Subir foto</h1>

        <NuevaFotoForm dataEventos={eventosData} />
      </div>
    </DasboardLayout>
  )
}
