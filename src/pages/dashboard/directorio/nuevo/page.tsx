import axiosInstance from "@/axiosInstance"
import Loader from "@/components/loader"
import DasboardLayout from "@/layouts/dashboard"
import { Cargo } from "@/types/cargo.interface"
import { Organizador } from "@/types/evento.interface"
import { Municipio } from "@/types/municipio.interface"
import { Seccion } from "@/types/seccion.interface"
import { useEffect, useState } from "react"
import DirectorioForm from "./form"

export default function DashboardNuevoDirectorio() {
  const [loading, setLoading] = useState(false)

  const [dataOrganizadores, setDataOrganizadores] = useState<Organizador[]>([])
  const [dataMunicipios, setDataMunicipios] = useState<Municipio[]>([])
  const [dataCargos, setDataCargos] = useState<Cargo[]>([])
  const [dataSecciones, setDataSecciones] = useState<Seccion[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)

      const responseOrganizadores = await axiosInstance.get("/organizaciones")
      setDataOrganizadores(responseOrganizadores.data)

      const responseMunicipios = await axiosInstance.get("/municipios")
      setDataMunicipios(responseMunicipios.data)

      const responseCargos = await axiosInstance.get("/cargos")
      setDataCargos(responseCargos.data)

      const responseSecciones = await axiosInstance.get("/secciones")
      setDataSecciones(responseSecciones.data)
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
        <h1 className='text-xl font-bold mb-7'>
          Registrar entrada en Directorio
        </h1>

        <DirectorioForm
          dataOrganizadores={dataOrganizadores}
          dataMunicipios={dataMunicipios}
          dataCargos={dataCargos}
          dataSecciones={dataSecciones}
        />
      </div>
    </DasboardLayout>
  )
}
