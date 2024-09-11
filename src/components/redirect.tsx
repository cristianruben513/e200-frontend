// src/pages/Redirect.tsx
import useAuthStore from "@/stores/useAuthStore"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Redirect: React.FC = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem("authToken")

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.perfil === "Staff") {
        navigate("/dashboard/eventos")
      } else {
        navigate("/dashboard")
      }
    } else {
      navigate("/login")
    }
  }, [isAuthenticated, navigate, user])

  return <div>Loading...</div>
}

export default Redirect
