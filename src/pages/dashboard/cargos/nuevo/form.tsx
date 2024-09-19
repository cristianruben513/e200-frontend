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
import { cargoSchema } from "@/validations/cargo"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

type CargoFormValues = z.infer<typeof cargoSchema>

export default function NuevoCargoForm() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CargoFormValues>({
    resolver: zodResolver(cargoSchema),
    mode: "onChange",
  })

  async function onSubmit(data: CargoFormValues) {
    setIsLoading(true)

    try {
      await axiosInstance.post("/cargos", { cargo: data.cargo })
      navigate("/dashboard/cargos")
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
          name='cargo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del cargo</FormLabel>
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
          Registar cargo
        </Button>
      </form>
    </Form>
  )
}
