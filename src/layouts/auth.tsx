import { cn } from "@/lib/utils"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='lg:h-[100dvh] h-[25dvh] flex-col items-center justify-center lg:grid  lg:grid-cols-5'>
      <div className='w-full h-full flex-col lg:col-span-2 p-10 text-white bg-blue-800'>
        <div className='relative z-20 flex flex-row items-center gap-6 mb-3'>
          <p className='lg:text-4xl text-2xl font-black'>E200</p>
        </div>
      </div>

      <div
        className={cn(
          "lg:col-span-3",
          "lg:h-[100dvh] h-[65dvh]",
          "flex items-center justify-center"
        )}
      >
        <div className='fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e6e6e6_1px,transparent_1px),linear-gradient(to_bottom,#e6e6e6_1px,transparent_1px)] bg-[size:6rem_4rem]'>
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#6fb1d8,transparent)]'></div>
        </div>

        {children}
      </div>
    </div>
  )
}
