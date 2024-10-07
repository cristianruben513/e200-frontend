/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from '@/axiosInstance'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { programaSchema } from '@/validations/programa'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import type { Organizacion } from '@/types/organizacion.interface'
import type { Programa } from '@/types/programa.interface'
import type { z } from 'zod'

type DirectorioFormValues = z.infer<typeof programaSchema>

export default function EditarProgramaForm({
	dataOrganizadores,
	dataPrograma,
}: {
	dataOrganizadores: Organizacion[]
	dataPrograma: Programa
}) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<DirectorioFormValues>({
		resolver: zodResolver(programaSchema),
		mode: 'onChange',
		defaultValues: {
			programa: dataPrograma.programa,
			organizacion: dataPrograma.organizacion.id.toString(),
		},
	})

	async function onSubmit(data: DirectorioFormValues) {
		setIsLoading(true)

		try {
			const directorioData = {
				programa: data.programa,
				organizacionId: Number(data.organizacion),
			}

			await axiosInstance.patch(`/programas/${dataPrograma.id}`, directorioData)

			toast.success('Programa actualizafo')
			navigate('/dashboard/programas')
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
					name="programa"
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

				<div className="grid md:grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="organizacion"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Organizacion</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
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
				</div>

				<Button disabled={!form.formState.isValid || isLoading} className="my-3">
					{isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
					Actualizar Programa
				</Button>
			</form>
		</Form>
	)
}
