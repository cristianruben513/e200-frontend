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
import { cargoSchema } from '@/validations/cargo'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import type { Cargo } from '@/types/cargo.interface'
import type { z } from 'zod'

type CargoFormValues = z.infer<typeof cargoSchema>

export default function EditarCargoForm({ dataCargo }: { dataCargo: Cargo }) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<CargoFormValues>({
		resolver: zodResolver(cargoSchema),
		mode: 'onChange',
		defaultValues: {
			cargo: dataCargo?.cargo,
		},
	})

	async function onSubmit(data: CargoFormValues) {
		setIsLoading(true)

		try {
			await axiosInstance.patch(`/tipo-lugares/${dataCargo.id}`, {
				cargo: data.cargo,
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
					name="cargo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre del tipo de cargo</FormLabel>
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
					Actualizar cargo
				</Button>
			</form>
		</Form>
	)
}
