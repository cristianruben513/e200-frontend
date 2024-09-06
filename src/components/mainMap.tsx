import { useMap } from "@/hooks/useMap"
import { useRef } from "react"

import "mapbox-gl/dist/mapbox-gl.css"

export default function MainMap({
  markers,
  center,
  zoom
}: {
  markers: { latitud: number; longitud: number }[]
  center: [number, number]
  zoom: number
}) {
  const mapRef = useRef(null)
  useMap(mapRef, markers, center, zoom)

  return <div ref={mapRef} className='w-full h-full rounded-xl' />
}
