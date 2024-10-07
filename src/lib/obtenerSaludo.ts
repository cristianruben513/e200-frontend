export function obtenerSaludo() {
	const ahora = new Date()
	const hora = ahora.getHours()

	if (hora < 12) {
		return 'Buenos días'
	}

	if (hora < 18) {
		return 'Buenas tardes'
	}

	return 'Buenas noches'
}
