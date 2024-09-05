import axiosInstance from "@/axiosInstance"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CalendarioEventos from "./calendario-eventos"
import { Evento } from "@/types/evento.interface"

export default function DashboardEventos() {
  const [data, setData] = useState<Evento[]>([])

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/eventos")
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DasboardLayout>
      <div className='md:mx-20 lg:mx-28 xl:mx-32'>
        <div className='flex md:flex-row flex-col gap-4 items-center justify-between mb-10'>
          <h1 className='text-xl font-bold'>Eventos</h1>

          <Link to='/dashboard/nuevo-evento' className={cn(buttonVariants())}>
            Agregar nuevo evento
          </Link>
        </div>

        <CalendarioEventos eventos={data} />
      </div>
    </DasboardLayout>
  )
}
