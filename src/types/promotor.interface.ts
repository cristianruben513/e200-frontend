import { Cargo } from "./cargo.interface";
import { Municipio } from "./municipio.interface";
import { Organizacion } from "./organizacion.interface";
import { Seccion } from "./seccion.interface";

export interface Promotor {
  id: number;
  nombre: string;
  iniciales: string;
  genero: string;
  afinidad: string;
  celular: string | null;
  email: string | null;
  comentario: string | null;
  marcador: string;
  municipio: Municipio | null;
  organizacion: Organizacion;
  cargo: Cargo;
  seccion: Seccion | null;
}
