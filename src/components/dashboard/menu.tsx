import { Menubar } from "@/components/ui/menubar"
import { IoLogOutOutline } from "react-icons/io5"
import { Button } from "../ui/button"
import MobileMenu from "./mobile-menu"

export function Menu() {
  return (
    <Menubar className='bg-blue-500 border-none px-2 lg:px-4 py-9 justify-between'>
      <div className='flex items-center justify-center font-bold gap-2 ml-3'>
        <span className='text-white'>Queretaro</span>
      </div>

      <div className='flex items-center gap-3'>
        <Button
          onClick={() => console.log("sign out")}
          className='md:flex hidden'
          variant='destructive'
        >
          <span className='md:block hidden'>Cerrar Sesion</span>
          <IoLogOutOutline className='text-xl md:ml-2' />
        </Button>

        <MobileMenu />
      </div>
    </Menubar>
  )
}
