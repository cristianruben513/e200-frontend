import DasboardLayout from "@/layouts/dashboard"
import NuevoTipoLugarForm from "./form"

export default function DashboardNuevoTipoLugar() {
  return (
    <DasboardLayout>
      <div className='md:mx-20     '>
        <h1 className='text-xl font-bold mb-7'>
          Registrar nuevo Tipo de lugar
        </h1>

        <NuevoTipoLugarForm />
      </div>
    </DasboardLayout>
  )
}
