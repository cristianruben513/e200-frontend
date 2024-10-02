import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ErrorStep() {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <section className='w-full relative'>
        <div
          className={cn(
            "p-10 w-full h-48 py-6 border-4 border-dotted bg-red-200/60 rounded-xl flex flex-col gap-3 justify-center items-center",
            "border-red-400/80"
          )}
        >
          <p className='text-center text-sm font-bold text-red-600'>
            HA OCURRIDO UN ERROR
          </p>
          <p className='text-center text-sm opacity-90 text-red-500'>
            Revisa el archivo y vuelve a intentarlo
          </p>
        </div>
      </section>

      <Button
        onClick={() => {
          window.location.reload()
        }}
      >
        Recargar pagina
      </Button>
    </div>
  )
}
