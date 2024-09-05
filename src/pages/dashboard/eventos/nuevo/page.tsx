import DasboardLayout from "@/layouts/dashboard"
import NewEventForm from "./form"
import { useState, useEffect } from "react"
import axiosInstance from "@/axiosInstance"
import { TipoLugar } from "@/types/tipo-lugares.interface"
import { TipoEvento } from "@/types/tipo-evento.interface"
import { EjeTematico, Impacto, Organizador } from "@/types/evento.interface"
import { Municipio } from "@/types/municipio.interface"
import { Seccion } from "@/types/seccion.interface"
import { Promotor } from "@/types/promotor.interface"

export default function DashboardNuevoEvento() {
  const [loading, setLoading] = useState(false)

  const [dataTipoLugar, setDataTipoLugar] = useState<TipoLugar[]>([])
  const [dataTipoEventos, setDataTipoEventos] = useState<TipoEvento[]>([])
  const [dataOrganizadores, setDataOrganizadores] = useState<Organizador[]>([])
  const [dataEjesTematicos, setDataEjesTematicos] = useState<EjeTematico[]>([])
  const [dataImpactos, setDataImpactos] = useState<Impacto[]>([])
  const [dataMunicipios, setDataMunicipios] = useState<Municipio[]>([])
  const [dataSecciones, setDataSecciones] = useState<Seccion[]>([])
  const [dataPromotores, setDataPromotores] = useState<Promotor[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)

      const responseTipoLugar = await axiosInstance.get("/tipo-lugares")
      setDataTipoLugar(responseTipoLugar.data)

      const responseTipoEventos = await axiosInstance.get("/tipo-eventos")
      setDataTipoEventos(responseTipoEventos.data)

      const responseOrganizadores = await axiosInstance.get("/organizaciones")
      setDataOrganizadores(responseOrganizadores.data)

      const responseEjesTematicos = await axiosInstance.get("/eje-tematicos")
      setDataEjesTematicos(responseEjesTematicos.data)

      const responseImpactos = await axiosInstance.get("/impactos")
      setDataImpactos(responseImpactos.data)

      const responseMunicipios = await axiosInstance.get("/municipios")
      setDataMunicipios(responseMunicipios.data)

      const responseSecciones = await axiosInstance.get("/secciones")
      setDataSecciones(responseSecciones.data)

      const responsePromotores = await axiosInstance.get("/directorios")
      setDataPromotores(responsePromotores.data)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <DasboardLayout>Cargando...</DasboardLayout>

  return (
    <DasboardLayout>
      <div className='md:mx-20 lg:mx-28 xl:mx-32'>
        <h1 className='text-xl font-bold mb-7'>Registrar evento</h1>

        <NewEventForm 
          dataTipoLugares={dataTipoLugar}
          dataTipoEventos={dataTipoEventos}
          dataOrganizadores={dataOrganizadores}
          dataEjesTematicos={dataEjesTematicos}
          dataImpactos={dataImpactos}
          dataMunicipios={dataMunicipios}
          dataSecciones={dataSecciones}
          dataPromotores={dataPromotores}
        />
      </div>
    </DasboardLayout>
  )
}
