import {
  IoAddCircleOutline,
  IoAt,
  IoBriefcaseOutline,
  IoBusinessOutline,
  IoCalendarOutline,
  IoCameraOutline,
  IoDocumentTextOutline,
  IoHomeOutline,
  IoIdCardOutline,
  IoMegaphoneOutline,
  IoOptionsOutline,
  IoPeopleCircleOutline,
} from "react-icons/io5"

import { IconType } from "react-icons/lib"

enum Categorias {
  ADMINSTRACION = "Administrador",
  AGENDA = "Agenda",
  ENCUESTAS = "Encuestas",
}

export interface Link {
  href: string
  categoria: Categorias
  icon: IconType
  label: string
  perfil: string
}

export const links: Link[] = [
  {
    href: "/dashboard",
    categoria: Categorias.AGENDA,
    icon: IoHomeOutline,
    label: "Inicio",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/eventos",
    categoria: Categorias.AGENDA,
    icon: IoCalendarOutline,
    label: "Eventos",
    perfil: "Staff",
  },
  {
    href: "/dashboard/nueva-foto",
    categoria: Categorias.AGENDA,
    icon: IoCameraOutline,
    label: "Agregar foto",
    perfil: "Staff",
  },
  {
    href: "/dashboard/directorio",
    categoria: Categorias.ADMINSTRACION,
    icon: IoAt,
    label: "Directorio",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/tipo-lugares",
    categoria: Categorias.ADMINSTRACION,
    icon: IoBusinessOutline,
    label: "Tipos de lugares",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/cargos",
    categoria: Categorias.ADMINSTRACION,
    icon: IoBriefcaseOutline,
    label: "Cargos",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/eje-tematicos",
    categoria: Categorias.ADMINSTRACION,
    icon: IoPeopleCircleOutline,
    label: "Ejes Tematicos",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/tipo-eventos",
    categoria: Categorias.ADMINSTRACION,
    icon: IoMegaphoneOutline,
    label: "Tipos de eventos",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/usuarios",
    categoria: Categorias.ADMINSTRACION,
    icon: IoIdCardOutline,
    label: "Usuarios",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/menus",
    categoria: Categorias.ADMINSTRACION,
    icon: IoOptionsOutline,
    label: "Opciones de menú",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/eventos/excel",
    categoria: Categorias.ADMINSTRACION,
    icon: IoDocumentTextOutline,
    label: "Carga masiva",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/nueva-encuesta",
    categoria: Categorias.ENCUESTAS,
    icon: IoAddCircleOutline,
    label: "Nueva encuesta",
    perfil: "Administrador",
  },
]
