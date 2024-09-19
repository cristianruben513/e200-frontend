import DasboardLayout from "@/layouts/dashboard"
import NuevoTipoEventoForm from "./form"

export default function DashboardNuevoEjeTematico() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Registrar nuevo Eje tematico</h1>
      <NuevoTipoEventoForm />
    </DasboardLayout>
  )
}
