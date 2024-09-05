// Genera las opciones de hora en formato de 24 horas
export const generateTimeOptions = () => {
  const options = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {  // Intervalos de 15 minutos
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      options.push(`${hour}:${minute}`);
    }
  }
  
  return options;
};