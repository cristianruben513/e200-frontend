import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { filterLinksByProfile, groupLinksByCategory } from "@/lib/sidebarUtils"
import { cn } from "@/lib/utils"
import useAuthStore from "@/stores/useAuthStore"
import { useLocation } from "react-router-dom"
import { links } from "./links"
import { SideBarItem } from "./sidebar-item"

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const location = useLocation()
  const pathname = location.pathname
  const { user } = useAuthStore()

  if (!user) return null

  // Filtrar los enlaces según el perfil del usuario
  const filteredLinks = filterLinksByProfile(links, user.perfil)

  // Agrupar los enlaces por categoría
  const groupedLinks = groupLinksByCategory(filteredLinks)

  return (
    <div className={cn("min-h-[calc(100vh-80px)] space-y-4 p-8", className)}>
      <h2 className='mb-6 text-xl font-bold'>Dashboard</h2>

      <div className='space-y-6'>
        {Object.entries(groupedLinks).map(([categoria, links]) => (
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem
              className='bg-neutral-200 rounded-xl p-3 py-1'
              value={categoria}
            >
              <AccordionTrigger>
                <h3 className='px-4 text-md font-semibold'>{categoria}</h3>
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
    </div>
  )
}

{
  /* <div className='bg-neutral-200 rounded-xl p-3' key={categoria}>
           
            
</div> */
}
