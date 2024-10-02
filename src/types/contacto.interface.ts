export interface Contacto {
  id: number;
  nombre: string;
  genero: 'F' | 'M';
  fechaNacimiento: string;
  ine?: string;
  celular: string;
  email?: string;
  domicilio?: string;
}
