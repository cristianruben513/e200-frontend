import { TipoLugar } from "./tipo-lugares.interface";
import { TipoEvento } from "./tipo-evento.interface";
import { Municipio } from "./municipio.interface";
import { Seccion } from "./seccion.interface";
import { Organizacion } from "./organizacion.interface";
import { Cargo } from "./cargo.interface";

export interface Evento {
  id: number;
  evento: string;
  descripcion: string;
  lugar: string;
  fechaInicio: string; // Formato 'YYYY-MM-DD'
  horaInicio: string;  // Formato 'HH:MM:SS'
  fechaFin: string | null;
  horaFin: string | null;
  asistentesEsperados: number;
  asistentesReales: number | null;
  latitud: string; // Latitud como cadena de texto
  longitud: string; // Longitud como cadena de texto
  localidad: string | null;
  calificacion: number | null;
  observaciones: string | null;
  urlRedesSociales: string | null;
  creador: Creador;
  tipoLugar: TipoLugar;
  tipoEvento: TipoEvento;
  organizador: Organizador;
  ejeTematico: EjeTematico;
  impacto: Impacto;
  municipio: Municipio;
  seccion: Seccion;
  promotor: Promotor;
}

export interface Creador {
  id: number;
  username: string;
  email: string;
  telefono: string;
  createdAt: string; // Formato ISO 8601
  deletedAt: string | null;
  perfil: Perfil;
}

export interface Perfil {
  id: number;
  perfil: string;
}

export interface Organizador {
  id: number;
  organizador: string;
}

export interface EjeTematico {
  id: number;
  ejeTematico: string;
}

export interface Impacto {
  id: number;
  impacto: string;
}

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
