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
      <div className='fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#0d71d560,transparent)]'></div>
      </div>

      <Menu />

      <div className='grid lg:grid-cols-5'>
        <Sidebar className='hidden lg:block bg-white shadow-xl' />

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
