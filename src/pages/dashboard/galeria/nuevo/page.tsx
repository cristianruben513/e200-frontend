import axiosInstance from "@/axiosInstance"
import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { Evento } from "@/types/evento.interface"
import { useEffect, useState } from "react"
import NuevaFotoForm from "./form"

export default function DashboardNuevaFoto() {
  const [loading, setLoading] = useState(false)
  const [dataEvento, setDataEvento] = useState<Evento[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)

      const responseEventos = await axiosInstance.get("/eventos")
      setDataEvento(responseEventos.data)
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
        <h1 className='text-xl font-bold mb-7'>Subir foto</h1>

        <NuevaFotoForm dataEventos={dataEvento} />
      </div>
    </DasboardLayout>
  )
}
