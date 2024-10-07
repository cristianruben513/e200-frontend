import { Map as MapboxMap } from 'mapbox-gl'

export const initMap = (
	container: HTMLDivElement,
	zoom: number,
	style: string,
  center: [number, number] = [-100.064524, 20.689728],
) => {
	return new MapboxMap({
		container,
		style,
		pitchWithRotate: false,
		center,
		zoom,
		accessToken:
			'pk.eyJ1IjoiY3Jpc3RpYW41MTMxMCIsImEiOiJjbTBxOXF3d3YwOWg5MmtweWtoZDA1czJ4In0.6k7X5Dd_uxBEjdFzJWAamQ',
		doubleClickZoom: false,
	})
}
