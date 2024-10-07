import axiosInstance from '@/axiosInstance'
import OptionalBadge from '@/components/optionalBadge'
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
import { Textarea } from '@/components/ui/textarea'
import { directorioSchema } from '@/validations/directorio'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import type { z } from 'zod'
import type { Cargo } from '@/types/cargo.interface'
import type { Municipio } from '@/types/municipio.interface'
import type { Organizacion } from '@/types/organizacion.interface'
import type { Seccion } from '@/types/seccion.interface'

type DirectorioFormValues = z.infer<typeof directorioSchema>

export default function DirectorioForm({
	dataOrganizadores,
	dataMunicipios,
	dataCargos,
	dataSecciones,
}: {
	dataOrganizadores: Organizacion[]
	dataMunicipios: Municipio[]
	dataCargos: Cargo[]
	dataSecciones: Seccion[]
}) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<DirectorioFormValues>({
		resolver: zodResolver(directorioSchema),
		mode: 'onChange',
	})

	// filtrar secciones por municipio
	const municipio = form.watch('municipio')
	const secciones = dataSecciones?.filter(
		(seccion) => seccion.municipio.id === Number(municipio),
	)

	async function onSubmit(data: DirectorioFormValues) {
		setIsLoading(true)

		try {
			const directorioData = {
				nombre: data.nombre,
				iniciales: data.iniciales,
				afinidad: data.afinidad,
				genero: data.genero,
				celular: data.celular,
				email: data.email,
				municipioId: Number(data.municipio),
				organizacionId: Number(data.organizacion),
				cargoId: Number(data.cargo),
				seccionId: Number(data.seccion),
				comentarios: data.comentarios,
			}

			console.log(JSON.stringify(directorioData))

			await axiosInstance.post('/directorios', directorioData)

			toast.success('Entrada en directorio registrada')
			navigate('/dashboard/directorio')
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
					name="nombre"
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
					name="iniciales"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Iniciales</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="genero"
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
										<SelectItem value="M">Masculino</SelectItem>
										<SelectItem value="F">Femenino</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="afinidad"
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
										<SelectItem value="A">Afin</SelectItem>
										<SelectItem value="N">Neutral</SelectItem>
										<SelectItem value="O">Opositor</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid md:grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="celular"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Celular
									<OptionalBadge />
								</FormLabel>
								<FormControl>
									<Input maxLength={10} minLength={10} {...field} />
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
								<FormLabel>
									Email
									<OptionalBadge />
								</FormLabel>
								<FormControl>
									<Input type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid md:grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="municipio"
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

					<FormField
						control={form.control}
						name="seccion"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Seccion
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
											{secciones?.map((item: Seccion) => (
												<SelectItem key={item.id} value={item.id.toString()}>
													{item.seccion}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid md:grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="organizacion"
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
											{dataOrganizadores?.map((item: Organizacion) => (
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

					<FormField
						control={form.control}
						name="cargo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Cargo</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{dataCargos?.map((item: Cargo) => (
												<SelectItem key={item.id} value={item.id.toString()}>
													{item.cargo}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="comentarios"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Comentarios
								<OptionalBadge />
							</FormLabel>
							<FormControl>
								<Textarea {...field} />
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
					Registar en directorio
				</Button>
			</form>
		</Form>
	)
}
