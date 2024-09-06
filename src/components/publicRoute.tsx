import React from "react"
import { Navigate, useLocation } from "react-router-dom"

interface PublicRouteProps {
  element: React.ReactElement
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("authToken")
  const location = useLocation()

  return !isAuthenticated ? (
    // Renderiza el componente público si el usuario no está autenticado
    element
  ) : (
    // Redirige al usuario a la página de inicio (o dashboard) si ya está autenticado
    <Navigate to='/dashboard' state={{ from: location }} />
  )
}

export default PublicRoute
