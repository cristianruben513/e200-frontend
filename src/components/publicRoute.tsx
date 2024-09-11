import useAuthStore from "@/stores/useAuthStore"
import React from "react"
import { Navigate, useLocation } from "react-router-dom"

interface PublicRouteProps {
  element: React.ReactElement
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { user } = useAuthStore()
  const isAuthenticated = !!localStorage.getItem("authToken")
  const location = useLocation()

  if (!isAuthenticated) {
    return element
  }

  if (user?.perfil === "Staff") {
    return <Navigate to='/dashboard/eventos' state={{ from: location }} />
  }

  return <Navigate to='/dashboard' state={{ from: location }} />
}

export default PublicRoute
