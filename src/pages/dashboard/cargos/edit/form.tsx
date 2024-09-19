import axiosInstance from "@/axiosInstance"
import Loader from "@/components/loader"
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
import { fetcher } from "@/lib/fetcher"
import { cargoSchema } from "@/validations/cargo"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import useSWR from "swr"
import { z } from "zod"

type CargoFormValues = z.infer<typeof cargoSchema>

export default function EditarCargoForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const { data, isValidating } = useSWR(`/tipo-lugares/${id}`, fetcher)

  const form = useForm<CargoFormValues>({
    resolver: zodResolver(cargoSchema),
    mode: "onChange",
  })

  // Actualizar el formulario con los datos obtenidos de SWR
  useEffect(() => {
    if (data) {
      form.reset({
        cargo: data.cargo,
      })
    }
  }, [data, form])

  async function onSubmit(data: CargoFormValues) {
    setIsLoading(true)

    try {
      await axiosInstance.patch(`/tipo-lugares/${id}`, { cargo: data.cargo })

      toast.success("Tipo de lugar actualizado con éxito")
      navigate("/dashboard/tipo-lugares")
    } catch {
      setIsLoading(false)
      toast.error("Algo salió mal al actualizar el tipo de lugar")
    } finally {
      setIsLoading(false)
    }
  }

  if (isValidating) {
    return <Loader />
  }

  return (
    <Form {...form}>
      <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='cargo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del tipo de cargo</FormLabel>
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
          Actualizar cargo
        </Button>
      </form>
    </Form>
  )
}
