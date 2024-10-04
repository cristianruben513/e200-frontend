export function obtenerSaludo() {
  const ahora = new Date();
  const hora = ahora.getHours();

  if (hora < 12) {
    return 'Buenos días';
  } else if (hora < 18) {
    return 'Buenas tardes';
  } else {
    return 'Buenas noches';
  }
}
