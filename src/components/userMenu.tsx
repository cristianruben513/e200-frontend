import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/stores/useAuthStore"

export function UserMenu() {
  const { user } = useAuthStore()

  const initials = user?.username.slice(0, 2).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative size-8 rounded-md'>
          <Avatar className='size-8 text-sm'>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 p-4' align='end' forceMount>
        <p className="font-bold text-blue-600">Nombre de usuario:</p>
        <p className="text-sm">{user?.username}</p>
        <p className="font-bold text-blue-600 mt-2">Tipo de perfil:</p>
        <p className="text-sm">{user?.perfil}</p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
