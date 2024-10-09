import axiosInstance from '@/axiosInstance'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { tipoEventoSchema } from '@/validations/tipoEvento'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import type { TipoEvento } from '@/types/tipo-evento.interface'
import type { z } from 'zod'

type TipoLugarFormValues = z.infer<typeof tipoEventoSchema>

export default function EditarJornadaSocial({ dataJornadaSocial }: { dataJornadaSocial: TipoEvento }) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<TipoLugarFormValues>({
		resolver: zodResolver(tipoEventoSchema),
		mode: 'onChange',
		defaultValues: {
			tipoEvento: dataJornadaSocial.tipoEvento,
		},
	})

	async function onSubmit(data: TipoLugarFormValues) {
		setIsLoading(true)

		try {
			await axiosInstance.patch(`/tipo-lugares/${dataJornadaSocial.id}`, {
				tipoEvento: data.tipoEvento,
			})
			toast.success('Tipo de lugar actualizado con éxito')
			navigate('/dashboard/tipo-lugares')
		} catch {
			setIsLoading(false)
			toast.error('Algo salió mal al actualizar el tipo de lugar')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="tipoEvento"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre del tipo de evento</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="my-3" disabled={isLoading || !form.formState.isValid}>
					{isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
					Actualizar tipo de evento
				</Button>
			</form>
		</Form>
	)
}
