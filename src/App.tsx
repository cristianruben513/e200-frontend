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
import DashboardNuevoEvento from "./pages/dashboard/eventos/nuevo/page"
import DashboardEventos from "./pages/dashboard/eventos/page"
import DashboardNuevaFoto from "./pages/dashboard/galeria/nuevo/page"
import DashboardGaleria from "./pages/dashboard/galeria/page"
import DashboardNuevoTipoLugar from "./pages/dashboard/tipo-lugares/nuevo/page"
import DashboardTipoLugares from "./pages/dashboard/tipo-lugares/page"

function App() {
  return (
    <BrowserRouter>
      <ToasterComponent />
      <Routes>
        <Route path='/' element={<Redirect />} />
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
          element={<ProtectedRoute element={<DashboardIndex />} />}
        />
        <Route
          path='/dashboard/eventos'
          element={<ProtectedRoute element={<DashboardEventos />} />}
        />
        <Route
          path='/dashboard/nuevo-evento'
          element={<ProtectedRoute element={<DashboardNuevoEvento />} />}
        />
        <Route
          path='/dashboard/eventos/:id'
          element={<ProtectedRoute element={<DashboardEventoDetail />} />}
        />
        <Route
          path='/dashboard/directorio'
          element={<ProtectedRoute element={<DashboardDirectorio />} />}
        />
        <Route
          path='/dashboard/nuevo-directorio'
          element={<ProtectedRoute element={<DashboardNuevoDirectorio />} />}
        />
        <Route
          path='/dashboard/tipo-lugares'
          element={<ProtectedRoute element={<DashboardTipoLugares />} />}
        />
        <Route
          path='/dashboard/nuevo-tipo-lugar'
          element={<ProtectedRoute element={<DashboardNuevoTipoLugar />} />}
        />
        <Route
          path='/dashboard/galeria'
          element={<ProtectedRoute element={<DashboardGaleria />} />}
        />
        <Route
          path='/dashboard/nueva-foto'
          element={<ProtectedRoute element={<DashboardNuevaFoto />} />}
        />

        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
