import MainMap from '@/components/mainMap'
import { useMemo } from 'react'

import type { Evento } from '@/types/evento.interface'

export const EventMap = ({
	latitud,
	longitud,
	eventoData,
}: {
	latitud: number
	longitud: number
	eventoData: Evento
}) => {
	const EventMap = useMemo(
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
		[longitud, latitud, eventoData],
	)

	return <div className="col-span-2 h-56">{EventMap}</div>
}
