import { generateNewMarker } from '@/lib/generateNewMarker';
import { initMap } from '@/lib/initMap';
import { MarkerData } from '@/types/marker-data.interface';
import { Map } from 'mapbox-gl';
import { useEffect, useRef } from 'react';

export const useMap = (
  container: React.RefObject<HTMLDivElement>,
  markersData: MarkerData[],
  center: [number, number],
  zoom: number,
  style: string
) => {
  const mapInitRef = useRef<Map | null>(null);

  // Inicializar el mapa
  useEffect(() => {
    if (container.current) {
      mapInitRef.current = initMap(container.current, center, zoom, style);
    }
  }, [container, center, zoom, style]);

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
        });
      });
    }
  }, [markersData]);
}