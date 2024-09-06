import axiosInstance from "@/axiosInstance"
import Loader from "@/components/loader"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import DasboardLayout from "@/layouts/dashboard"
import { cn } from "@/lib/utils"
import { Foto } from "@/types/foto.interface"
import { MapPinnedIcon, SquareUserIcon } from "lucide-react"
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

        <TooltipProvider>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {dataFotos.map((foto) => (
              <Tooltip key={foto.id}>
                <TooltipTrigger>
                  <img
                    className='aspect-square rounded-xl shadow-lg object-cover'
                    src={foto.url}
                    alt={foto.evento.evento}
                  />
                </TooltipTrigger>
                <TooltipContent className='grid gap-2 bg-slate-200'>
                  <p className='text-lg font-bold'>{foto.evento.evento}</p>
                  <p className='flex items-center'>
                    <MapPinnedIcon className='mr-1' size={16} />
                    {foto.evento.municipio.municipio}
                  </p>
                  <p className='flex items-center'>
                    <SquareUserIcon className='mr-1' size={16} />
                    {foto.evento.promotor.nombre}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </DasboardLayout>
  )
}
