import DasboardLayout from "@/layouts/dashboard"
import NuevoGrupoForm from "./form"

export default function DashboardNuevoGrupo() {
  return (
    <DasboardLayout>
      <h1 className='text-xl font-bold mb-7'>
        Registrar nuevo grupo de contactos
      </h1>

      <NuevoGrupoForm />
    </DasboardLayout>
  )
}
