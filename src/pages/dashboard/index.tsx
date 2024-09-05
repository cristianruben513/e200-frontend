import DasboardLayout from "@/layouts/dashboard"

export default function DashboardIndex() {
  return (
    <DasboardLayout>
      <div className='grid place-items-center h-[50dvh]'>
        <p className='flex items-center gap-1 text-8xl'>
          <span className='font-light'>E</span>
          <span className='font-bold text-blue-500'>200</span>
        </p>
      </div>
    </DasboardLayout>
  )
}
