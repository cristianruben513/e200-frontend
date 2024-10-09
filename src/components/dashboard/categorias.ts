/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChartColumnStacked,
  MailCheck,
  NotepadText,
  UserCog,
  Users,
} from "lucide-react"

// Define el tipo para las categorías
interface Categoria {
  label: string;
  icon: any;
}

// Define el tipo para las categorías
type Categorias = {
  [key: string]: Categoria;
};

export const categorias: Categorias = {
  ADMINSTRACION: {
    label: "Administración",
    icon: UserCog,
  },
  AGENDA: {
    label: "Agenda",
    icon: NotepadText,
  },
  ENCUESTAS: {
    label: "Encuestas",
    icon: ChartColumnStacked,
  },
  INVITACIONES: {
    label: "Invitaciones",
    icon: MailCheck,
  },
  JORNADAS_SOCIALES: {
    label: "Jornadas sociales",
    icon: Users,
  },
}
