import DasboardLayout from "@/layouts/dashboard"
import NewEventForm from "./form"

export default function DashboardNuevoEvento() {
  return (
    <DasboardLayout>
      <div className='md:mx-20 lg:mx-28 xl:mx-32'>
        <h1 className='text-xl font-bold mb-7'>Registrar evento</h1>

        <NewEventForm />
      </div>
    </DasboardLayout>
  )
}
