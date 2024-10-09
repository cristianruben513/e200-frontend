import DasboardLayout from "@/layouts/dashboard"
import NuevoTipoEventoForm from "./form"

export default function DashboardNuevoTipoEvento() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Registrar nueva jornada social</h1>
      <NuevoTipoEventoForm />
    </DasboardLayout>
  )
}
