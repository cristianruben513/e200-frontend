import { jwtDecode } from 'jwt-decode'
import { Navigate, useLocation } from 'react-router-dom'

import type React from 'react'
import type { JwtPayload } from '@/types/jwt.interface'

interface ProtectedRouteProps {
	element: React.ReactElement
	allowedRoles: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	element,
	allowedRoles,
}) => {
	const token = localStorage.getItem('authToken')
	const location = useLocation()

	if (!token) {
		return <Navigate to="/login" state={{ from: location }} />
	}

	try {
		const decodedToken: JwtPayload = jwtDecode(token)

		if (!allowedRoles.includes(decodedToken.perfil)) {
			return <Navigate to="/unauthorized" state={{ from: location }} />
		}

		return element
	} catch {
		return <Navigate to="/login" state={{ from: location }} />
	}
}

export default ProtectedRoute
