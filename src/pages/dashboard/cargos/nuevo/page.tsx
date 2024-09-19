import DasboardLayout from "@/layouts/dashboard"
import NuevoCargoForm from "./form"

export default function DashboardNuevoCargo() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Registrar nuevo Cargo</h1>
      <NuevoCargoForm />
    </DasboardLayout>
  )
}
