import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToasterComponent } from "./components/providers/toaster"
import IndexPage from "./pages"
import LoginPage from "./pages/auth/login/page"
import DashboardIndex from "./pages/dashboard"
import DashboardNuevoDirectorio from "./pages/dashboard/directorio/nuevo/page"
import DashboardDirectorio from "./pages/dashboard/directorio/page"
import DashboardNuevoEvento from "./pages/dashboard/eventos/nuevo/page"
import DashboardNuevaFoto from "./pages/dashboard/galeria/nuevo/page"
import DashboardGaleria from "./pages/dashboard/galeria/page"
import DashboardNuevoTipoLugar from "./pages/dashboard/tipo-lugares/nuevo/page"
import DashboardTipoLugares from "./pages/dashboard/tipo-lugares/page"
import DashboardEventos from "./pages/dashboard/eventos/page"

function App() {
  return (
    <BrowserRouter>
      <ToasterComponent />
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<h1>Register</h1>} />

        <Route path='/dashboard' element={<DashboardIndex />} />

        <Route path='/dashboard/eventos' element={<DashboardEventos/>} />
        <Route
          path='/dashboard/nuevo-evento'
          element={<DashboardNuevoEvento />}
        />

        <Route path='/dashboard/directorio' element={<DashboardDirectorio />} />
        <Route
          path='/dashboard/nuevo-directorio'
          element={<DashboardNuevoDirectorio />}
        />

        <Route
          path='/dashboard/tipo-lugares'
          element={<DashboardTipoLugares />}
        />
        <Route
          path='/dashboard/nuevo-tipo-lugar'
          element={<DashboardNuevoTipoLugar />}
        />

        <Route path='/dashboard/galeria' element={<DashboardGaleria />} />
        <Route path='/dashboard/nueva-foto' element={<DashboardNuevaFoto />} />

        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
