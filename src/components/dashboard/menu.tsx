import { Menubar } from "@/components/ui/menubar"
import LogoutButton from "../logoutButton"
import { UserMenu } from "../userMenu"
import MobileMenu from "./mobile-menu"

export function Menu() {
  return (
    <Menubar className='bg-blue-900 border-none px-6 py-7 justify-between shadow-xl'>
      <div className='flex items-center justify-center font-bold gap-2'>
        <span className='text-white'>E200</span>
      </div>

      <div className='flex items-center gap-3'>
        <UserMenu />
        <div className="md:block hidden">
          <LogoutButton />
        </div>
        <MobileMenu />
      </div>
    </Menubar>
  )
}
