import DasboardLayout from "@/layouts/dashboard"
import EditarCargoForm from "./form"

export default function DashboardEditarCargo() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Editar Cargo</h1>

      <EditarCargoForm />
    </DasboardLayout>
  )
}
