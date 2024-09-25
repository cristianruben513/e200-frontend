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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

import { Organizador } from "@/types/evento.interface"
import { programaSchema } from "@/validations/programa"

type DirectorioFormValues = z.infer<typeof programaSchema>

export default function NuevoProgramaForm({
  dataOrganizadores,
}: {
  dataOrganizadores: Organizador[]
}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<DirectorioFormValues>({
    resolver: zodResolver(programaSchema),
    mode: "onChange",
  })

  async function onSubmit(data: DirectorioFormValues) {
    setIsLoading(true)

    try {
      const programaData = {
        programa: data.programa,
        organizacionId: Number(data.organizacion),
      }

      await axiosInstance.post("/programas", programaData)

      toast.success("Programa registrado")
      navigate("/dashboard/programas")
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
          name='programa'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del programa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='organizacion'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organizacion</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dataOrganizadores?.map((item: Organizador) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.organizador}
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
          Registar programa
        </Button>
      </form>
    </Form>
  )
}
