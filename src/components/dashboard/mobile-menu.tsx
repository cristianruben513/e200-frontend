import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { filterLinksByProfile, groupLinksByCategory } from "@/lib/sidebarUtils"
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

  // Agrupar los enlaces por categoría
  const groupedLinks = groupLinksByCategory(filteredLinks)

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
              {Object.entries(groupedLinks).map(([categoria, links]) => (
                <Accordion
                  key={categoria}
                  type='single'
                  collapsible
                  className='w-full'
                >
                  <AccordionItem
                    className='bg-neutral-200 rounded-xl p-2 py-0'
                    value={categoria}
                  >
                    <AccordionTrigger>
                      <h3 className='px-4 font-semibold'>{categoria}</h3>
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
              ))}
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
