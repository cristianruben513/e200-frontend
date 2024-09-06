// src/pages/Redirect.tsx
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Redirect: React.FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem("authToken")

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return <div>Loading...</div>
}

export default Redirect
