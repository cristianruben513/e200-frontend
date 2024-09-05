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
  },
  {
    href: "/dashboard/eventos",
    icon: IoBarChartOutline,
    label: "Eventos",
  },
  {
    href: "/dashboard/directorio",
    icon: IoAt,
    label: "Directorio",
  },
  {
    href: "/dashboard/tipo-lugares",
    icon: IoBusinessOutline,
    label: "Tipo de lugares",
  },
  {
    href: "/dashboard/galeria",
    icon: IoGridOutline,
    label: "Galeria",
  },
]
