import DasboardLayout from "@/layouts/dashboard"
import EditarTipoLugarForm from "./form"

export default function DashboardEditarTipoLugar() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Editar Tipo de lugar</h1>

      <EditarTipoLugarForm />
    </DasboardLayout>
  )
}
