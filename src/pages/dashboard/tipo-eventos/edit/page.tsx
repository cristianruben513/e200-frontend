import DasboardLayout from "@/layouts/dashboard"
import EditarTipoLugarForm from "./form"

export default function DashboardEditarTipoEvento() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Editar Tipo de evento</h1>
      <EditarTipoLugarForm />
    </DasboardLayout>
  )
}
