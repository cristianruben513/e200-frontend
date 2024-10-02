import Background from "@/components/background"
import { Menu } from "@/components/dashboard/menu"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { PropsWithChildren } from "react"

export default function DasboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Background />
      <Menu />

      <div className='flex'>
        <Sidebar className='hidden lg:block bg-white shadow-xl' />

        <ScrollArea className='col-span-3 lg:col-span-4 lg:border-l flex-1'>
          <div className='h-full px-4 pt-6 pb-3'>
            <div className='md:mx-20'>{children}</div>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </>
  )
}
