import useAuthStore from "@/stores/useAuthStore"
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
