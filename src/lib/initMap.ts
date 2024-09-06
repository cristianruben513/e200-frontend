import { Map } from 'mapbox-gl';

export const initMap = (
  container: HTMLDivElement,
  center: [number, number] = [-100.064524, 20.689728],
  zoom: number
) => {
  return new Map({
    container,
    style: 'mapbox://styles/cristian51310/cm0qai6yd02dv01qv4exw5q8a',
    pitchWithRotate: false,
    center,
    zoom,
    accessToken: 'pk.eyJ1IjoiY3Jpc3RpYW41MTMxMCIsImEiOiJjbTBxOXF3d3YwOWg5MmtweWtoZDA1czJ4In0.6k7X5Dd_uxBEjdFzJWAamQ',
    doubleClickZoom: false,
  });
}