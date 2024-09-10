import DasboardLayout from "@/layouts/dashboard"
import EditarTipoLugarForm from "./form"

export default function DashboardEditarTipoLugar() {
  return (
    <DasboardLayout>
      <div className='md:mx-20'>
        <h1 className='text-xl font-bold mb-7'>Editar Tipo de lugar</h1>

        <EditarTipoLugarForm />
      </div>
    </DasboardLayout>
  )
}
