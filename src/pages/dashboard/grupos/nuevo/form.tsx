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
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

import { grupoSchema } from "@/validations/grupo"

type GrupoFormValues = z.infer<typeof grupoSchema>

export default function NuevoGrupoForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<GrupoFormValues>({
    resolver: zodResolver(grupoSchema),
    mode: "onChange",
  })

  async function onSubmit(data: GrupoFormValues) {
    setIsLoading(true)

    try {
      const programaData = {
        nombre: data.nombre,
      }

      await axiosInstance.post("/grupos", programaData)

      toast.success("Grupo registrado")
      navigate("/dashboard/grupos")
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
          name='nombre'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del grupo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={!form.formState.isValid || isLoading}
          className='my-3'
        >
          {isLoading && <LoaderIcon className='mr-2 h-4 w-4 animate-spin' />}
          Registar grupo
        </Button>
      </form>
    </Form>
  )
}
