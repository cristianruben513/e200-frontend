import DasboardLayout from "@/layouts/dashboard"
import DirectorioForm from "./form"
import { Organizador } from "@/types/evento.interface"
import { useState } from "react"
import { useEffect } from "react"
import axiosInstance from "@/axiosInstance"
import { Municipio } from "@/types/municipio.interface"
import { Cargo } from "@/types/cargo.interface"
import { Seccion } from "@/types/seccion.interface"

export default function DashboardNuevoDirectorio() {
  const [loading, setLoading] = useState(false)

  const [dataOrganizadores, setDataOrganizadores] = useState<Organizador[]>([])
  const [dataMunicipios , setDataMunicipios] = useState<Municipio[]>([])
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

  if (loading) return <DasboardLayout>Cargando...</DasboardLayout>

  return (
    <DasboardLayout>
      <div className='md:mx-20 lg:mx-28 xl:mx-32'>
        <h1 className='text-xl font-bold mb-7'>Registrar entrada en Directorio</h1>

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
