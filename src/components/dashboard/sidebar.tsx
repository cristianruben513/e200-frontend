import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { filterLinksByProfile } from "@/lib/sidebarUtils"
import { cn } from "@/lib/utils"
import useAuthStore from "@/stores/useAuthStore"
import { ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { links } from "./links"
import { SideBarItem } from "./sidebar-item"

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const location = useLocation()
  const pathname = location.pathname
  const { user } = useAuthStore()

  const initialCollapsedState = () => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sidebar-collapsed")
      return storedState ? JSON.parse(storedState) : false
    }
    return false
  }

  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsedState)

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(!prev))
      return !prev
    })
  }

  if (!user) return null

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
    <div
      className={cn(
        "min-h-[calc(100vh-60px)] p-6",
        className,
        collapsed ? "w-20 px-3" : "w-64 px-6"
      )}
    >
      <button
        onClick={toggleSidebar}
        className='mb-4 flex items-center justify-center bg-gray-200 rounded p-2'
      >
        <ChevronRightIcon
          className={cn(
            "size-5 transition-transform duration-300",
            collapsed ? "" : "rotate-180"
          )}
        />
      </button>

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
                className={cn(
                  "bg-neutral-200 rounded-xl px-4 py-0 transition-all duration-300",
                  collapsed && "px-2 py-0"
                )}
                value={categoriaLabel}
              >
                <AccordionTrigger className='flex items-center'>
                  <span>
                    <Icon className={cn("size-4")} />
                  </span>
                  <h3
                    className={cn(
                      "font-semibold",
                      collapsed ? "text-xs hidden" : "text-sm"
                    )}
                  >
                    {categoriaLabel}
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='grid gap-2'>
                    {links.map((option, index) => (
                      <SideBarItem
                        key={index}
                        currentPathname={pathname}
                        href={option.href}
                      >
                        <option.icon
                          className={cn("size-4", !collapsed && "mr-3")}
                        />
                        {!collapsed && option.label}
                      </SideBarItem>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        )}
      </div>
    </div>
  )
}
