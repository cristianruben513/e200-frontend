import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

export default function LoadingStep() {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <section className='w-full relative'>
        <div
          className={cn(
            "p-10 w-full h-48 py-6 border-4 border-dotted bg-neutral-200/60 rounded-xl flex flex-col gap-3 justify-center items-center",
            "border-neutral-400/80"
          )}
        >
          <Loader2Icon className='size-4 animate-spin' />
        </div>
      </section>
    </div>
  )
}
