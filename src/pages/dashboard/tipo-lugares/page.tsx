import axiosInstance from "@/axiosInstance"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { cn } from "@/lib/utils"
import { TipoLugar } from "@/types/tipo-lugares.interface"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TipoLugaresTable from "./tipo-lugares-table"
import Loader from "@/components/loader"

export default function DashboardTipoLugares() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TipoLugar[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/tipo-lugares")
      setData(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <DasboardLayout>
        <Loader />
      </DasboardLayout>
    )
  }

  return (
    <DasboardLayout>
      <div className='md:mx-20   '>
        <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-7'>
          <h1 className='text-xl font-bold'>Tipos de lugares</h1>

          <Link
            to='/dashboard/nuevo-tipo-lugar'
            className={cn(buttonVariants(), "w-fit")}
          >
            Agregar nuevo tipo de lugar
          </Link>
        </div>

        <TipoLugaresTable dataTipoLugares={data} />
      </div>
    </DasboardLayout>
  )
}
