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
import { ejeTematicoSchema } from "@/validations/ejeTematico"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

type EjeTematicoFormValues = z.infer<typeof ejeTematicoSchema>

export default function NuevoEjeTematicoForm() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EjeTematicoFormValues>({
    resolver: zodResolver(ejeTematicoSchema),
    mode: "onChange",
  })

  async function onSubmit(data: EjeTematicoFormValues) {
    setIsLoading(true)

    try {
      await axiosInstance.post("/eje-tematicos", {
        ejeTematico: data.ejeTematico,
      })
      navigate("/dashboard/eje-tematicos")
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
          name='ejeTematico'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del eje tematico</FormLabel>
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
          Registar eje tematico
        </Button>
      </form>
    </Form>
  )
}
