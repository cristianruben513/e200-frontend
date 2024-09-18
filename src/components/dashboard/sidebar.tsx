import { cn } from "@/lib/utils"
import useAuthStore from "@/stores/useAuthStore"
import { useLocation } from "react-router-dom"
import { adminLinks } from "./links"
import { SideBarItem } from "./sidebar-item"

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const location = useLocation()
  const pathname = location.pathname

  // mostrar solo los links que corresponden al perfil del usuario
  // si es Administrador, mostrar todos los links
  // si es Supervisor, mostrar solo los links que tienen perfil "Supervisor" y "Staff"
  // si es Staff, mostrar solo los links que tienen perfil "Staff"
  const { user } = useAuthStore()

  const filteredLinks = adminLinks.filter(
    (link) =>
      user?.perfil === "Administrador" ||
      (user?.perfil === "Supervisor" && link.perfil !== "Administrador") ||
      (user?.perfil === "Staff" && link.perfil === "Staff")
  )

  return (
    <div className={cn("min-h-[calc(100vh-80px)] space-y-4 p-4", className)}>
      <h2 className='mb-6 mt-4 px-4 text-xl font-bold'>Dashboard</h2>

      <div className='grid gap-2'>
        {filteredLinks.map((option, index) => (
          <SideBarItem
            key={index}
            currentPathname={pathname}
            href={option.href}
          >
            <option.icon className='text-xl mr-3' />
            {option.label}
          </SideBarItem>
        ))}
      </div>
    </div>
  )
}
