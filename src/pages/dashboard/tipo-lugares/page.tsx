import axiosInstance from "@/axiosInstance"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { cn } from "@/lib/utils"
import { TipoLugar } from "@/types/tipo-lugares.interface"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TipoLugaresTable from "./tipo-lugares-table"

export default function DashboardTipoLugares() {
  const [data, setData] = useState<TipoLugar[]>([])

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/tipo-lugares")
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
        <div className='flex md:flex-row flex-col gap-4 items-center justify-between mb-7'>
          <h1 className='text-xl font-bold'>Tipos de lugares</h1>

          <Link
            to='/dashboard/nuevo-tipo-lugar'
            className={cn(buttonVariants())}
          >
            Agregar nuevo tipo de lugar
          </Link>
        </div>

        <TipoLugaresTable dataTipoLugares={data} />
      </div>
    </DasboardLayout>
  )
}
