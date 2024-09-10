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
import useAuthStore from "@/stores/useAuthStore"
import { loginSchema } from "@/validations/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { jwtDecode } from "jwt-decode"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { JwtPayload } from "@/types/jwt.interface"

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const { setUser } = useAuthStore()

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)

    try {
      const loginData = {
        username: data.username,
        password: data.password,
      }

      const response = await axiosInstance.post("/auth/login", loginData)

      const token = response.data.token

      localStorage.setItem("authToken", token)

      // Configurar Axios para incluir el token en futuras solicitudes
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`

      // Decodificar el token JWT para obtener el perfil y otros datos
      const decodedToken: JwtPayload = jwtDecode(token)

      // Guardar el usuario y el token en el estado global de Zustand
      setUser(
        {
          username: decodedToken.username,
          perfil: decodedToken.perfil,
        },
        token
      )

      // Redirigir al dashboard
      navigate("/dashboard")
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
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder='username-example' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type='password' placeholder='********' {...field} />
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
          Iniciar Sesion
        </Button>
      </form>
    </Form>
  )
}
