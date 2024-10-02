/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/axiosInstance"
import OptionalBadge from "@/components/optionalBadge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

import { Contacto } from "@/types/contacto.interface"
import { contactoSchema } from "@/validations/contacto"

type ContactoFormValues = z.infer<typeof contactoSchema>

export default function EditarDirectorioForm({
  dataContacto,
}: {
  dataContacto: Contacto
}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ContactoFormValues>({
    resolver: zodResolver(contactoSchema),
    mode: "onChange",
  })

  useEffect(() => {
    form.reset({
      nombre: dataContacto.nombre,
      genero: dataContacto.genero,
      fechaNacimiento: new Date(dataContacto.fechaNacimiento),
      ine: dataContacto.ine || "",
      celular: dataContacto.celular,
      email: dataContacto.email || "",
      domicilio: dataContacto.domicilio,
    })
  }, [])

  async function onSubmit(data: ContactoFormValues) {
    setIsLoading(true)

    try {
      const contactoData = {
        nombre: data.nombre,
        genero: data.genero,
        fechaNacimiento: new Date(data.fechaNacimiento)
          .toISOString()
          .slice(0, 10),
        ine: data.ine,
        celular: data.celular,
        email: data.email,
        domicilio: data.domicilio,
      }

      await axiosInstance.patch(`/contactos/${dataContacto.id}`, contactoData)

      toast.success("Contacto actualizado")
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
          name='genero'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genero</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='M'>Masculino</SelectItem>
                    <SelectItem value='F'>Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='fechaNacimiento'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <CalendarIcon className='size-4' />
                Fecha de Nacimiento
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={new Date(2006, 1)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='ine'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Ine <OptionalBadge />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid md:grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='celular'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input maxLength={10} minLength={10} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
          name='domicilio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domicilio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          className='my-3'
        >
          {isLoading && <LoaderIcon className='mr-2 h-4 w-4 animate-spin' />}
          Editar contacto
        </Button>
      </form>
    </Form>
  )
}
