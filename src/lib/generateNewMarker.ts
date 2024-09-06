import { Map, Marker, Popup } from 'mapbox-gl';

export const generateNewMarker = ({
  longitud, 
  latitud, 
  map,
}: {
  longitud: number,
  latitud: number,
  map: Map
}) => {
  const popUp = new Popup({ closeButton: false, anchor: 'left', })
    .setHTML(`<div class="popup">You click here: <br/>[${longitud},  ${latitud}]</div>`)

  new Marker({ color: '#63df29', scale: 1 })
    .setLngLat([longitud, latitud])
    .setPopup(popUp)
    .addTo(map)
}