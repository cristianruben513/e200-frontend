import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToasterComponent } from "./components/providers/toaster"

import ProtectedRoute from "./components/protectedRoute"
import PublicRoute from "./components/publicRoute"
import Redirect from "./components/redirect"

import LoginPage from "./pages/auth/login/page"
import DashboardNuevoDirectorio from "./pages/dashboard/directorio/nuevo/page"
import DashboardDirectorio from "./pages/dashboard/directorio/page"
import DashboardEventoDetail from "./pages/dashboard/eventos/detail/page"
import DashboardEditarEvento from "./pages/dashboard/eventos/edit/page"
import DashboardNuevoEvento from "./pages/dashboard/eventos/nuevo/page"
import DashboardEventos from "./pages/dashboard/eventos/page"
import DashboardNuevaFoto from "./pages/dashboard/galeria/nuevo/page"
import DashboardGaleria from "./pages/dashboard/galeria/page"
import DashboardIndex from "./pages/dashboard/inicio"
import DashboardEditarTipoLugar from "./pages/dashboard/tipo-lugares/edit/page"
import DashboardNuevoTipoLugar from "./pages/dashboard/tipo-lugares/nuevo/page"
import DashboardTipoLugares from "./pages/dashboard/tipo-lugares/page"
import DashboardNuevoUsuario from "./pages/dashboard/usuarios/nuevo/page"
import DashboardUsuarios from "./pages/dashboard/usuarios/page"

import { Perfil } from "./enums/perfil.enum"
import DashboardEditarCargo from "./pages/dashboard/cargos/edit/page"
import DashboardNuevoCargo from "./pages/dashboard/cargos/nuevo/page"
import DashboardCargos from "./pages/dashboard/cargos/page"
import DashboardEditarContacto from "./pages/dashboard/contactos/editar/page"
import DashboardNuevoContacto from "./pages/dashboard/contactos/nuevo/page"
import DashboardContactos from "./pages/dashboard/contactos/page"
import DashboardEditarDirectorio from "./pages/dashboard/directorio/editar/page"
import DashboardEditarEjeTematico from "./pages/dashboard/eje-tematicos/edit/page"
import DashboardNuevoEjeTematico from "./pages/dashboard/eje-tematicos/nuevo/page"
import DashboardEjeTematicos from "./pages/dashboard/eje-tematicos/page"
import DashboardExcel from "./pages/dashboard/excel/page"
import InvitacionDetail from "./pages/dashboard/invitaciones/detail/page"
import DashboardInvitaciones from "./pages/dashboard/invitaciones/page"
import DashboardMenuOptions from "./pages/dashboard/menu/page"
import DashboardEditarPrograma from "./pages/dashboard/programas/editar/page"
import DashboardNuevoPrograma from "./pages/dashboard/programas/nuevo/page"
import DashboardProgramas from "./pages/dashboard/programas/page"
import DashboardEditarTipoEvento from "./pages/dashboard/tipo-eventos/edit/page"
import DashboardNuevoTipoEvento from "./pages/dashboard/tipo-eventos/nuevo/page"
import DashboardTipoEventos from "./pages/dashboard/tipo-eventos/page"
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
          path='/dashboard/invitaciones'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardInvitaciones />}
            />
          }
        />
        
        <Route path='/invitacion/:id' element={<InvitacionDetail />} />

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
          path='/dashboard/contactos'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardContactos />}
            />
          }
        />
        <Route
          path='/dashboard/nuevo-contacto'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardNuevoContacto />}
            />
          }
        />
        <Route
          path='/dashboard/editar-contacto/:id'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardEditarContacto />}
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
          path='/dashboard/programas'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardProgramas />}
            />
          }
        />
        <Route
          path='/dashboard/nuevo-programa'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardNuevoPrograma />}
            />
          }
        />
        <Route
          path='/dashboard/editar-programa/:id'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardEditarPrograma />}
            />
          }
        />

        <Route
          path='/dashboard/tipo-eventos'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardTipoEventos />}
            />
          }
        />
        <Route
          path='/dashboard/nuevo-tipo-evento'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardNuevoTipoEvento />}
            />
          }
        />
        <Route
          path='/dashboard/editar-tipo-evento/:id'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardEditarTipoEvento />}
            />
          }
        />

        <Route
          path='/dashboard/eje-tematicos'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardEjeTematicos />}
            />
          }
        />
        <Route
          path='/dashboard/nuevo-eje-tematico'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardNuevoEjeTematico />}
            />
          }
        />
        <Route
          path='/dashboard/editar-eje-tematico/:id'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardEditarEjeTematico />}
            />
          }
        />

        <Route
          path='/dashboard/cargos'
          element={
            <ProtectedRoute allowedRoles={all} element={<DashboardCargos />} />
          }
        />
        <Route
          path='/dashboard/nuevo-cargo'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardNuevoCargo />}
            />
          }
        />
        <Route
          path='/dashboard/editar-cargo/:id'
          element={
            <ProtectedRoute
              allowedRoles={all}
              element={<DashboardEditarCargo />}
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

        <Route
          path='/dashboard/menus'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardMenuOptions />}
            />
          }
        />

        <Route
          path='/dashboard/eventos/excel'
          element={
            <ProtectedRoute
              allowedRoles={[Perfil.Administrador]}
              element={<DashboardExcel />}
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
