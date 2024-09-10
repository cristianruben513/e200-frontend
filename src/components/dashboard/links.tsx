import {
  IoAt,
  IoBarChartOutline,
  IoBusinessOutline,
  IoGridOutline,
  IoHomeOutline,
} from "react-icons/io5"

export const adminLinks = [
  {
    href: "/dashboard",
    icon: IoHomeOutline,
    label: "Inicio",
    perfil: "Staff",
  },
  {
    href: "/dashboard/eventos",
    icon: IoBarChartOutline,
    label: "Eventos",
    perfil: "Staff",
  },
  {
    href: "/dashboard/directorio",
    icon: IoAt,
    label: "Directorio",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/tipo-lugares",
    icon: IoBusinessOutline,
    label: "Tipo de lugares",
    perfil: "Administrador",
  },
  {
    href: "/dashboard/galeria",
    icon: IoGridOutline,
    label: "Galeria",
    perfil: "Staff",
  },
]
