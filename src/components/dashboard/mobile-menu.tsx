import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { IoMenuOutline } from "react-icons/io5"
import { adminLinks } from "./links"
import { useLocation } from "react-router-dom"
import { MobileMenuItem } from "./mobile-menu-item"

export default function MobileMenu() {
  const location = useLocation()
  const pathname = location.pathname

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
                {adminLinks.map((option, index) => (
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

              <Button
                onClick={() => console.log("Cerrar Sesion")}
                variant='destructive'
              >
                Cerrar sesion
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
