import DasboardLayout from "@/layouts/dashboard"
import DirectorioForm from "./form"

export default function DashboardNuevoContacto() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>Registrar contacto</h1>

      <DirectorioForm />
    </DasboardLayout>
  )
}
