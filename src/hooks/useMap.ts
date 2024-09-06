import { generateNewMarker } from '@/lib/generateNewMarker';
import { initMap } from '@/lib/initMap';
import { Map } from 'mapbox-gl';
import { useEffect, useRef } from 'react';

interface MarkerData {
  latitud: number;
  longitud: number;
}

export const useMap = (
  container: React.RefObject<HTMLDivElement>, 
  markersData: MarkerData[],
  center: [number, number],
  zoom: number
) => {
  const mapInitRef = useRef<Map | null>(null);

  // Inicializar el mapa
  useEffect(() => {
    if (container.current) {
      mapInitRef.current = initMap(container.current, center, zoom);
    }
  }, [container, center, zoom]);

  // Agregar marcadores desde el array
  useEffect(() => {
    if (mapInitRef.current && markersData.length > 0) {
      markersData.forEach(({ latitud, longitud }) => {
        generateNewMarker({
          map: mapInitRef.current!,
          latitud,
          longitud,
        });
      });
    }
  }, [markersData]);
}