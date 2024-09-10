import axiosInstance from "@/axiosInstance"
import OptionalBadge from "@/components/optionalBadge"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { directorioSchema } from "@/validations/directorio"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

import { Municipio } from "@/types/municipio.interface"

type DirectorioFormValues = z.infer<typeof directorioSchema>

export default function DirectorioForm({
  dataMunicipios,
}: {
  dataMunicipios: Municipio[]
}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<DirectorioFormValues>({
    resolver: zodResolver(directorioSchema),
    mode: "onChange",
  })

  async function onSubmit(data: DirectorioFormValues) {
    setIsLoading(true)

    try {
      const directorioData = {
        nombre: data.nombre,
        iniciales: data.iniciales,
        afinidad: data.afinidad,
        genero: data.genero,
        email: data.email,
        municipioId: Number(data.municipio),
      }
      await axiosInstance.post("/directorios", directorioData)

      toast.success("Entrada en directorio registrada")
      navigate("/dashboard/directorio")
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

        <FormField
          control={form.control}
          name='afinidad'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Afinidad</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='A'>Afin</SelectItem>
                    <SelectItem value='N'>Neutral</SelectItem>
                    <SelectItem value='O'>Opositor</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid md:grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                  <OptionalBadge />
                </FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='municipio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Municipio
                <OptionalBadge />
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dataMunicipios?.map((item: Municipio) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.municipio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          Registar en directorio
        </Button>
      </form>
    </Form>
  )
}
