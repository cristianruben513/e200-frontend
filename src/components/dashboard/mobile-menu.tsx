import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { filterLinksByProfile } from "@/lib/sidebarUtils"
import useAuthStore from "@/stores/useAuthStore"
import { IoMenuOutline } from "react-icons/io5"
import { useLocation } from "react-router-dom"
import LogoutButton from "../logoutButton"
import { links } from "./links"
import { SideBarItem } from "./sidebar-item"

export default function MobileMenu() {
  const location = useLocation()
  const pathname = location.pathname
  const { user } = useAuthStore()

  if (!user) return null

  // Filtrar los enlaces según el perfil del usuario
  const filteredLinks = filterLinksByProfile(links, user.perfil)

  const groupedLinks = filteredLinks.reduce((acc, option) => {
    const categoriaLabel = option.categoria.label // Obtener el label de la categoría

    if (!acc[categoriaLabel]) {
      acc[categoriaLabel] = {
        icon: option.categoria.icon,
        links: [],
      }
    }
    acc[categoriaLabel].links.push(option)
    return acc
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, { icon: any; links: typeof filteredLinks }>)

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
            <div className='space-y-4'>
              {Object.entries(groupedLinks).map(
                ([categoriaLabel, { icon: Icon, links }]) => (
                  <Accordion
                    key={categoriaLabel}
                    type='single'
                    collapsible
                    className='w-full'
                  >
                    <AccordionItem
                      className='bg-neutral-200 rounded-xl p-2 py-0'
                      value={categoriaLabel}
                    >
                      <AccordionTrigger>
                        <span>
                          <Icon className={"size-4 ml-3"} />
                        </span>
                        <h3 className='px-4 font-semibold'>{categoriaLabel}</h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className='grid gap-2'>
                          {links.map((option, index) => (
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
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )
              )}
            </div>
            <div className='flex flex-col justify-between h-full mt-5'>
              <LogoutButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
