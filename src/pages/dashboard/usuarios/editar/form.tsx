/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from '@/axiosInstance'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import type { Perfil } from '@/types/perfil.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { z } from 'zod'

import type { Usuario } from '@/types/usuario.interface'
import { registerSchema } from '@/validations/register'

type RegisterFormValues = z.infer<typeof registerSchema>

export default function UsuarioForm({
	dataPerfiles,
	dataUsuario,
}: {
	dataPerfiles: Perfil[]
	dataUsuario: Usuario
}) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
		defaultValues: {
			username: dataUsuario.username,
			email: dataUsuario.email,
			telefono: dataUsuario.telefono,
			perfil: dataUsuario.perfil.id.toString(),
		},
	})

	async function onSubmit(data: RegisterFormValues) {
		setIsLoading(true)

		try {
			const registerData = {
				username: data.username,
				email: data.email,
				telefono: data.telefono,
				idPerfil: Number(data.perfil),
			}

			await axiosInstance.patch(`/usuarios/${dataUsuario.id}`, registerData)

			toast.success('Usuario actualizado')
			navigate('/dashboard/usuarios')
		} catch {
			setIsLoading(false)
			toast.error('Algo salió mal')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre de usuario</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Correo Electronico</FormLabel>
							<FormControl>
								<Input type="email" autoComplete="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="telefono"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telefono</FormLabel>
							<FormControl>
								<Input maxLength={10} minLength={10} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="perfil"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Perfil</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{dataPerfiles?.map((item: Perfil) => (
											<SelectItem key={item.id} value={item.id.toString()}>
												{item.perfil}
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
					className="my-3"
				>
					{isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
					Registar usuario
				</Button>
			</form>
		</Form>
	)
}
