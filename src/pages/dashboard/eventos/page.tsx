import axiosInstance from "@/axiosInstance"
import CalendarioEventos from "@/components/calendar/calendar"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { cn } from "@/lib/utils"
import { Evento } from "@/types/evento.interface"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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
      <div className='md:mx-20     '>
        <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10'>
          <h1 className='text-xl font-bold'>Eventos</h1>

          <Link
            to='/dashboard/nuevo-evento'
            className={cn(buttonVariants(), "w-fit")}
          >
            Agregar nuevo evento
          </Link>
        </div>

        <CalendarioEventos eventos={data} />
      </div>
    </DasboardLayout>
  )
}
