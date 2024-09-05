import DasboardLayout from "@/layouts/dashboard"
import NuevaFotoForm from "./form"

export default function DashboardNuevaFoto() {
  return (
    <DasboardLayout>
      <div className='md:mx-20 lg:mx-28 xl:mx-32'>
        <h1 className='text-xl font-bold mb-7'>Subir foto</h1>

        <NuevaFotoForm />
      </div>
    </DasboardLayout>
  )
}
