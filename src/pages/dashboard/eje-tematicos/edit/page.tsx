import DasboardLayout from "@/layouts/dashboard"
import EditarEjeTematicoForm from "./form"

export default function DashboardEditarEjeTematico() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Editar Eje tematico</h1>
      <EditarEjeTematicoForm />
    </DasboardLayout>
  )
}
