import { Cargo } from "./cargo.interface";
import { Municipio } from "./municipio.interface";
import { Organizacion } from "./organizacion.interface";
import { Seccion } from "./seccion.interface";

export interface Promotor {
  id: number;
  nombre: string;
  genero: string;
  celular: string;
  email: string;
  comentario: string | null;
  municipio: Municipio;
  organizacion: Organizacion;
  cargo: Cargo;
  seccion: Seccion;
}
