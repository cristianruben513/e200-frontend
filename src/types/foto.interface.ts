import { Evento } from "./evento.interface";

export interface Foto {
  id: number;
  url: string;
  evento: Evento
}