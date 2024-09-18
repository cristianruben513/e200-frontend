import { Menubar } from "@/components/ui/menubar"
import { UserMenu } from "../userMenu"
import MobileMenu from "./mobile-menu"

export function Menu() {
  return (
    <Menubar className='bg-blue-500 border-none px-2 lg:px-4 py-9 justify-between'>
      <div className='flex items-center justify-center font-bold gap-2 ml-3'>
        <span className='text-white'>E200</span>
      </div>

      <div className='flex items-center gap-3'>
        <UserMenu />
        <MobileMenu />
      </div>
    </Menubar>
  )
}
