type GeoPosition = {
	latitud: string;
	longitud: string;
};

export const obtenerGeolocalizacion = (): Promise<GeoPosition> => {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					resolve({
						latitud: position.coords.latitude.toString(),
						longitud: position.coords.longitude.toString(),
					});
				},
				(error: GeolocationPositionError) => {
					reject(`Error al obtener la geolocalización: ${error.message}`);
				},
			);
		} else {
			reject('Geolocalización no soportada por este navegador.');
		}
	});
};
