import DasboardLayout from "@/layouts/dashboard"
import DirectorioForm from "./form"

export default function DashboardNuevoDirectorio() {
  return (
    <DasboardLayout>
      <div className='md:mx-20 lg:mx-28 xl:mx-32'>
        <h1 className='text-xl font-bold mb-7'>Registrar entrada en Directorio</h1>

        <DirectorioForm />
      </div>
    </DasboardLayout>
  )
}
