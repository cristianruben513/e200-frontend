import { generateNewMarker } from '@/lib/generateNewMarker'
import { initMap } from '@/lib/initMap'
import { useEffect, useRef } from 'react'

import type { MarkerData } from '@/types/marker-data.interface'
import type { Map as MapboxMap } from 'mapbox-gl'

export const useMap = (
	container: React.RefObject<HTMLDivElement>,
	markersData: MarkerData[],
	center: [number, number],
	zoom: number,
	style: string,
) => {
	const mapInitRef = useRef<MapboxMap | null>(null)

	// Inicializar el mapa
	useEffect(() => {
		if (container.current) {
			mapInitRef.current = initMap(container.current, zoom, style, center)
		}
	}, [container, center, zoom, style])

	// Agregar marcadores desde el array
	useEffect(() => {
		if (mapInitRef.current && markersData.length > 0) {
			markersData.forEach(({ latitud, longitud, marcador, nombreEvento, fechaInicio }) => {
				generateNewMarker({
					map: mapInitRef.current!,
					latitud,
					longitud,
					iconUrl: marcador,
					nombreEvento,
					fechaInicio,
				})
			})
		}
	}, [markersData])
}
