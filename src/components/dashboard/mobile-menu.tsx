import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import useAuthStore from "@/stores/useAuthStore"
import { IoMenuOutline } from "react-icons/io5"
import { useLocation } from "react-router-dom"
import LogoutButton from "../logoutButton"
import { UserMenu } from "../userMenu"
import { adminLinks } from "./links"
import { MobileMenuItem } from "./mobile-menu-item"

export default function MobileMenu() {
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
    <div className='flex lg:hidden w-full'>
      <div className=' py-4 px-3 w-full'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon'>
              <IoMenuOutline className='text-xl' />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className='flex flex-col justify-between h-full'>
              <div className='grid gap-2 mt-4'>
                {filteredLinks.map((option, index) => (
                  <MobileMenuItem
                    key={index}
                    currentPathname={pathname}
                    href={option.href}
                  >
                    <option.icon className='text-xl mr-3' />
                    {option.label}
                  </MobileMenuItem>
                ))}
              </div>

              <div className="grid gap-3">
                <UserMenu />
                <LogoutButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
