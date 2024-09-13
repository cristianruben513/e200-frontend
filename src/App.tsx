import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToasterComponent } from "./components/providers/toaster"

import ProtectedRoute from "./components/protectedRoute"
import PublicRoute from "./components/publicRoute"
import Redirect from "./components/redirect"

import LoginPage from "./pages/auth/login/page"
import DashboardIndex from "./pages/dashboard"
import DashboardNuevoDirectorio from "./pages/dashboard/directorio/nuevo/page"
import DashboardDirectorio from "./pages/dashboard/directorio/page"
import DashboardEventoDetail from "./pages/dashboard/eventos/detail/page"
import DashboardEditarEvento from "./pages/dashboard/eventos/edit/page"
import DashboardNuevoEvento from "./pages/dashboard/eventos/nuevo/page"
import DashboardEventos from "./pages/dashboard/eventos/page"
import DashboardNuevaFoto from "./pages/dashboard/galeria/nuevo/page"
import DashboardGaleria from "./pages/dashboard/galeria/page"
import DashboardEditarTipoLugar from "./pages/dashboard/tipo-lugares/edit/page"
import DashboardNuevoTipoLugar from "./pages/dashboard/tipo-lugares/nuevo/page"
import DashboardTipoLugares from "./pages/dashboard/tipo-lugares/page"
import DashboardNuevoUsuario from "./pages/dashboard/usuarios/nuevo/page"
import DashboardUsuarios from "./pages/dashboard/usuarios/page"

import { Perfil } from "./enums/perfil.enum"
import DashboardEditarDirectorio from "./pages/dashboard/directorio/editar/page"
import DashboardEditarUsuario from "./pages/dashboard/usuarios/editar/page"

function App() {
  const all = [Perfil.Administrador, Perfil.Staff, Perfil.Supervisor]

  return (
    <BrowserRouter>
      <ToasterComponent />
      <Routes>
        <Route path='/' element={<Redirect />} />
        <Route
          path='/login'
          element={<PublicRoute element={<LoginPage />} />}
        />
        <Route
          path='/register'
          element={<PublicRoute element={<h1>Register</h1>} />}
        />

        {/* Rutas protegidas */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute allowedRoles={all} element={<DashboardIndex />} />
          }
        />
        <Route
          path='/dashboard/eventos'
          element={
            <ProtectedRoute allowedRoles={all} element={<DashboardEventos />} />
          }
        />
        <Route
          path='/dashboard/nuevo-evento'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardNuevoEvento />}
            />
          }
        />
        <Route
          path='/dashboard/editar-evento/:id'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardEditarEvento />}
            />
          }
        />
        <Route
          path='/dashboard/eventos/:id'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardEventoDetail />}
            />
          }
        />
        <Route
          path='/dashboard/directorio'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardDirectorio />}
            />
          }
        />
        <Route
          path='/dashboard/nuevo-directorio'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardNuevoDirectorio />}
            />
          }
        />
        <Route
          path='/dashboard/editar-promotor/:id'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardEditarDirectorio />}
            />
          }
        />
        <Route
          path='/dashboard/tipo-lugares'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardTipoLugares />}
            />
          }
        />
        <Route
          path='/dashboard/nuevo-tipo-lugar'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardNuevoTipoLugar />}
            />
          }
        />
        <Route
          path='/dashboard/editar-tipo-lugar/:id'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardEditarTipoLugar />}
            />
          }
        />
        <Route
          path='/dashboard/galeria'
          element={
            <ProtectedRoute allowedRoles={all} element={<DashboardGaleria />} />
          }
        />
        <Route
          path='/dashboard/nueva-foto'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardNuevaFoto />}
            />
          }
        />

        <Route
          path='/dashboard/usuarios'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardUsuarios />}
            />
          }
        />
        <Route
          path='/dashboard/nuevo-usuario'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardNuevoUsuario />}
            />
          }
        />
        <Route
          path='/dashboard/editar-usuario/:id'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardEditarUsuario />}
            />
          }
        />

        <Route path='/unauthorized' element={<h1>Unauthorized</h1>} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
