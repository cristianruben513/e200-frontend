import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useAuthStore from "@/stores/useAuthStore"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { IoLogOutOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

export default function LogoutButton() {
  const navigate = useNavigate()
  const { clearUser } = useAuthStore()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    clearUser()
    navigate("/login")
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='flex' variant='destructive' size="sm">
          <span className='block'>Cerrar Sesion</span>
          <IoLogOutOutline className='text-xl md:ml-2' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cerrar Sesion</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estas seguro que deseas cerrar sesion?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Cerrar Sesion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
