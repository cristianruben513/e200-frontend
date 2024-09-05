import DasboardLayout from "@/layouts/dashboard"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useEffect } from "react"
import { useState } from "react"
import axiosInstance from "@/axiosInstance"
import { Promotor } from "@/types/promotor.interface"
import DirectorioTable from "./directorio-table"

export default function DashboardDirectorio() {
  const [data, setData] = useState<Promotor[]>([])

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/directorios")
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
          <h1 className='text-xl font-bold'>Directorio</h1>

          <Link to='/dashboard/nuevo-directorio' className={cn(buttonVariants())}>
            Agregar contacto a directorio
          </Link>
        </div>

        <DirectorioTable dataDirectorio={data}/>
      </div>
    </DasboardLayout>
  )
}
