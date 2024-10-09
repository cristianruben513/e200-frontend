import axiosInstance from '@/axiosInstance'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { LoaderIcon } from 'lucide-react'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import OptionalBadge from '@/components/optionalBadge'
import { jornadaSocialSchema } from '@/validations/jornadaSocial'
import type { z } from 'zod'

type TipoEventoFormValues = z.infer<typeof jornadaSocialSchema>

export default function NuevaJornadaSocialForm() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<TipoEventoFormValues>({
		resolver: zodResolver(jornadaSocialSchema),
		mode: 'onChange',
	})

	async function onSubmit(data: TipoEventoFormValues) {
		setIsLoading(true)

		const jornadaSocialData = {
			nombre: data.nombre,
			descripcion: data.descripcion,
			folio: data.folio,
			fechaInicio: new Date(data.fechaInicio).toISOString().slice(0, 10),
		}

		try {
			await axiosInstance.post('/jornadas-sociales', jornadaSocialData)
			navigate('/dashboard/jornadas-sociales')
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
							<FormLabel>Nombre de la jornada social</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="descripcion"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Descripcion
								<OptionalBadge />
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="folio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Folio del evento</FormLabel>
							<FormControl>
								<Input className='uppercase' minLength={6} maxLength={6} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="fechaInicio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<CalendarIcon className="size-4" />
								Fecha de inicio
							</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-full pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Elige una fecha</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="my-3" disabled={isLoading || !form.formState.isValid}>
					{isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
					Registar jornada social
				</Button>
			</form>
		</Form>
	)
}
