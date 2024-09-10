import axiosInstance from "@/axiosInstance"
import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { cn } from "@/lib/utils"
import { Foto } from "@/types/foto.interface"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function DashboardGaleria() {
  const [loading, setLoading] = useState(false)
  const [dataFotos, setDataFotos] = useState<Foto[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)

      const responseFotos = await axiosInstance.get("/fotos")
      setDataFotos(responseFotos.data)
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
        <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between mb-7'>
          <h1 className='text-xl font-bold'>Galeria</h1>

          <Link
            to='/dashboard/nueva-foto'
            className={cn(buttonVariants(), "w-fit")}
          >
            Agregar nueva foto
          </Link>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {dataFotos.map((foto) => (
            <img
              key={foto.id}
              className='aspect-square rounded-xl shadow-lg object-cover'
              src={foto.url}
            />
          ))}
        </div>
      </div>
    </DasboardLayout>
  )
}
