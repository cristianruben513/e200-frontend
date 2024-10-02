import Background from "@/components/background"
import { cn } from "@/lib/utils"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='lg:h-[100dvh] h-[25dvh] flex-col items-center justify-center lg:grid  lg:grid-cols-5'>
      <div className='w-full h-full flex-col lg:col-span-2 p-10 text-white bg-blue-800'>
        <div className='relative z-20 flex flex-row items-center gap-6'>
          <p className='lg:text-4xl text-2xl font-black'>E200</p>
        </div>
      </div>

      <div
        className={cn(
          "md:col-span-3",
          "md:h-[100dvh] h-[65dvh]",
          "flex md:items-center md:justify-center"
        )}
      >
        <Background />

        <div className='w-full p-6'>{children}</div>
      </div>
    </div>
  )
}
