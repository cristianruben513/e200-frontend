import axiosInstance from "@/axiosInstance"
import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { cn } from "@/lib/utils"
import { Promotor } from "@/types/promotor.interface"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DirectorioTable from "./directorio-table"

export default function DashboardDirectorio() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Promotor[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/directorios")
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
      <div className='md:mx-20     '>
        <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-10'>
          <h1 className='text-xl font-bold'>Directorio</h1>

          <Link
            to='/dashboard/nuevo-directorio'
            className={cn(buttonVariants(), "w-fit")}
          >
            Agregar contacto a directorio
          </Link>
        </div>

        <DirectorioTable dataDirectorio={data} />
      </div>
    </DasboardLayout>
  )
}
