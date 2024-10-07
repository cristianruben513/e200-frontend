import axiosInstance from '@/axiosInstance'
import Loader from '@/components/loader'
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
import { fetcher } from '@/lib/fetcher'
import { tipoEventoSchema } from '@/validations/tipoEvento'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import useSWR from 'swr'
import type { z } from 'zod'

type TipoLugarFormValues = z.infer<typeof tipoEventoSchema>

export default function EditarTipoLugarForm() {
	const navigate = useNavigate()
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(false)

	const { data, isValidating } = useSWR(`/tipo-eventos/${id}`, fetcher)

	const form = useForm<TipoLugarFormValues>({
		resolver: zodResolver(tipoEventoSchema),
		mode: 'onChange',
    defaultValues: {
      tipoEvento: data.tipoEvento,
    },
	})

	async function onSubmit(data: TipoLugarFormValues) {
		setIsLoading(true)

		try {
			await axiosInstance.patch(`/tipo-lugares/${id}`, {
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

	if (isValidating) {
		return <Loader />
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

				<Button
					className="my-3"
					disabled={isLoading || !form.formState.isValid}
				>
					{isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
					Actualizar tipo de evento
				</Button>
			</form>
		</Form>
	)
}
