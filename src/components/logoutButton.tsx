import { IoLogOutOutline } from "react-icons/io5"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Eliminar el token de autenticación
    localStorage.removeItem("authToken")
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login")
  }

  return (
    <Button
      onClick={handleLogout}
      className='md:flex hidden'
      variant='destructive'
    >
      <span className='md:block hidden'>Cerrar Sesion</span>
      <IoLogOutOutline className='text-xl md:ml-2' />
    </Button>
  )
}
