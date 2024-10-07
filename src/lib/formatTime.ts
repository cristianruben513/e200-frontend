export function formatTime(hora24: string) {
	const [hora, minutos] = hora24.split(':')

	let horaEn12 = Number.parseInt(hora, 10)
	const periodo = horaEn12 >= 12 ? 'PM' : 'AM'

	horaEn12 = horaEn12 % 12 || 12 // Ajusta la hora a formato de 12 horas

	return `${horaEn12}:${minutos} ${periodo}` // Retorna el formato de 12 horas con AM/PM
}
