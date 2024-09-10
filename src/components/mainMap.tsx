import { useMap } from "@/hooks/useMap"
import { useRef } from "react"

import { MarkerData } from "@/types/marker-data.interface"
import "mapbox-gl/dist/mapbox-gl.css"

export default function MainMap({
  markers,
  center,
  zoom,
  style = "mapbox://styles/cristian51310/cm0qai6yd02dv01qv4exw5q8a",
}: {
  markers: MarkerData[]
  center: [number, number]
  zoom: number
  style?: string
}) {
  const mapRef = useRef(null)
  useMap(mapRef, markers, center, zoom, style)

  return (
    <div
      ref={mapRef}
      className='w-full h-full rounded-xl border border-neutral-500'
    />
  )
}
