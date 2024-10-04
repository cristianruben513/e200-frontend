import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCheckIcon } from "lucide-react"

export default function SuccessStep({
  successMessage,
  successButtonText,
}: {
  successMessage: string
  successButtonText: string
}) {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <section className='w-full relative'>
        <div
          className={cn(
            "p-10 w-full h-48 py-6 border-4 border-dotted bg-green-200/60 rounded-xl flex flex-col gap-3 justify-center items-center",
            "border-green-400/80"
          )}
        >
          <p className='text-center text-sm font-bold text-green-600'>
            ARCHIVO CARGADO CON ÉXITO
          </p>
          <p className='text-center text-sm opacity-90 text-green-500'>
            {successMessage}
          </p>
        </div>
      </section>

      <Button onClick={() => console.log("Redirigir a algun lugar")}>
        <CheckCheckIcon className='size-4 mr-2' />
        {successButtonText}
      </Button>
    </div>
  )
}
