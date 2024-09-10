import { Map, Marker, Popup } from 'mapbox-gl';

export const generateNewMarker = ({
  longitud,
  latitud,
  map,
  iconUrl,
  nombreEvento,
  fechaInicio,
}: {
  longitud: number,
  latitud: number,
  map: Map,
  iconUrl: string
  nombreEvento: string
  fechaInicio: string
}) => {
  const popUp = new Popup({ closeButton: false, anchor: 'left', })
    .setHTML(`
      <div class="popup">
        <p>${nombreEvento}</p>
        <br/> 
        <p>${fechaInicio}</p>
      </div>
    `);

  // Crear un elemento div que contendrá la imagen del marcador
  const el = document.createElement('div');
  el.className = 'custom-marker';

  // Crear la imagen del marcador
  const img = document.createElement('img');
  img.src = iconUrl;
  img.style.width = '40px';
  img.style.height = '25px';

  el.appendChild(img);

  // Crear el marcador con el elemento personalizado
  new Marker(el)
    .setLngLat([longitud, latitud])
    .setPopup(popUp)
    .addTo(map);
}
