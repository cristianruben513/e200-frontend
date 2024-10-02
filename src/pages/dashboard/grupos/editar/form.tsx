/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

import { Grupo } from "@/types/grupo.interface"
import { grupoSchema } from "@/validations/grupo"

type DirectorioFormValues = z.infer<typeof grupoSchema>

export default function EditarProgramaForm({
  dataGrupo,
}: {
  dataGrupo: Grupo
}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<DirectorioFormValues>({
    resolver: zodResolver(grupoSchema),
    mode: "onChange",
  })

  useEffect(() => {
    form.reset({
      nombre: dataGrupo.nombre,
    })
  }, [])

  async function onSubmit(data: DirectorioFormValues) {
    setIsLoading(true)

    try {
      await axiosInstance.patch(`/programas/${dataGrupo.id}`, {
        nombre: data.nombre,
      })

      toast.success("Grupo actualizado")
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
              <FormLabel>Nombre</FormLabel>
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
          Actualizar grupo
        </Button>
      </form>
    </Form>
  )
}
