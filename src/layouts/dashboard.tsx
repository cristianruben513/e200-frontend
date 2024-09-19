import { Menu } from "@/components/dashboard/menu"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function DasboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Menu />

      <div className='grid lg:grid-cols-5'>
        <Sidebar className='hidden lg:block' />

        <ScrollArea className='col-span-3 lg:col-span-4 lg:border-l h-[90vh]'>
          <div className='h-full px-8 py-6 lg:px-8'>
            <div className='md:mx-20'>{children}</div>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </>
  )
}
