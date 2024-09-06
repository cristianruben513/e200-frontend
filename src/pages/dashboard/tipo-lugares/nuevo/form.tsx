import axiosInstance from "@/axiosInstance"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { tipoLugarSchema } from "@/validations/tipoLugar"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

type TipoLugarFormValues = z.infer<typeof tipoLugarSchema>

export default function NuevoTipoLugarForm() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TipoLugarFormValues>({
    resolver: zodResolver(tipoLugarSchema),
    mode: "onChange",
  })

  async function onSubmit(data: TipoLugarFormValues) {
    setIsLoading(true)

    try {
      const tipoLugarData = {
        tipoLugar: data.tipoLugar,
      }
      await axiosInstance.post("/tipo-lugares", tipoLugarData)

      navigate("/dashboard/tipo-lugares")
    } catch {
      setIsLoading(false)
      toast.error("Algo salió mal")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='tipoLugar'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del tipo de lugar</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='my-3'
          disabled={isLoading || !form.formState.isValid}
        >
          {isLoading && <LoaderIcon className='mr-2 h-4 w-4 animate-spin' />}
          Registar tipo de lugar
        </Button>
      </form>
    </Form>
  )
}
