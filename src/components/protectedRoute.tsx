import React from "react"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedRouteProps {
  element: React.ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("authToken") // Verifica si el token está en localStorage
  const location = useLocation()

  return isAuthenticated ? (
    // Renderiza el componente protegido
    element
  ) : (
    // Redirige al usuario a la página de inicio de sesión
    <Navigate to='/login' state={{ from: location }} />
  )
}

export default ProtectedRoute
