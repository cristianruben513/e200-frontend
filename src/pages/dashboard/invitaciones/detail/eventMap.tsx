import MainMap from "@/components/mainMap"
import { Evento } from "@/types/evento.interface"
import { useMemo } from "react"

export const EventMap = ({
  latitud,
  longitud,
  eventoData,
}: {
  latitud: number
  longitud: number
  eventoData: Evento
}) => {
  const Map = useMemo(
    () => (
      <MainMap
        center={[longitud, latitud]}
        markers={[
          {
            latitud,
            longitud,
            marcador: eventoData?.promotor.marcador,
            nombreEvento: eventoData?.evento,
            fechaInicio: eventoData?.fechaInicio,
          },
        ]}
        zoom={14}
      />
    ),
    [longitud, latitud, eventoData]
  )

  return <div className='col-span-2 h-56'>{Map}</div>
}
