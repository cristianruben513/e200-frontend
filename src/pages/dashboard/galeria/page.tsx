import { buttonVariants } from "@/components/ui/button"
import DasboardLayout from "@/layouts/dashboard"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export default function DashboardGaleria() {
  return (
    <DasboardLayout>
      <div className='md:mx-20 lg:mx-28 xl:mx-32'>
        <div className='flex md:flex-row flex-col gap-4 items-center justify-between mb-7'>
          <h1 className='text-xl font-bold'>Galeria</h1>

          <Link
            to='/dashboard/nueva-foto'
            className={cn(buttonVariants())}
          >
            Agregar nueva foto
          </Link>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div className='bg-neutral-200 rounded-xl h-40 grid place-items-center'>{i}</div>
          ))}
        </div>
      </div>
    </DasboardLayout>
  )
}
