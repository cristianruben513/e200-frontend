import axiosInstance from '@/axiosInstance'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { fetcher } from '@/lib/fetcher'
import { ejeTematicoSchema } from '@/validations/ejeTematico'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import useSWR from 'swr'

import type { EjeTematico } from '@/types/eje-tematico.interface'
import type { z } from 'zod'

type EjeTematicoFormValues = z.infer<typeof ejeTematicoSchema>

export default function EditarEjeTematicoForm({ dataEje }: { dataEje: EjeTematico }) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const { data, isValidating } = useSWR(`/eje-tematicos/${dataEje.id}`, fetcher)

	const form = useForm<EjeTematicoFormValues>({
		resolver: zodResolver(ejeTematicoSchema),
		mode: 'onChange',
		defaultValues: {
			ejeTematico: data.ejeTematico,
		},
	})

	async function onSubmit(data: EjeTematicoFormValues) {
		setIsLoading(true)

		try {
			await axiosInstance.patch(`/eje-tematicos/${dataEje.id}`, {
				ejeTematico: data.ejeTematico,
			})
			toast.success('Eje tematico actualizado con éxito')
			navigate('/dashboard/eje-tematicos')
		} catch {
			setIsLoading(false)
			toast.error('Algo salió mal al actualizar el eje tematico')
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
					name="ejeTematico"
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

				<Button className="my-3" disabled={isLoading || !form.formState.isValid}>
					{isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
					Actualizar eje tematico
				</Button>
			</form>
		</Form>
	)
}
