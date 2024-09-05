import { cn } from "@/lib/utils"
import { adminLinks } from "./links"
import { useLocation } from "react-router-dom"
import { SideBarItem } from "./sidebar-item"

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className={cn("min-h-[calc(100vh-80px)] space-y-4 p-4", className)}>
      <h2 className='mb-6 mt-4 px-4 text-xl font-bold'>Dashboard</h2>
      
      <div className='grid gap-2'>
        {adminLinks.map((option, index) => (
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
