import axiosInstance from '@/axiosInstance'
import OptionalBadge from '@/components/optionalBadge'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { generateTimeOptions } from '@/lib/timeSelectOptions'
import { cn } from '@/lib/utils'
import { eventSchema } from '@/validations/events'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
	CalendarIcon,
	CalendarOffIcon,
	Clock9Icon,
	ClockIcon,
	LoaderIcon,
	MapPinIcon,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { obtenerGeolocalizacion } from '@/lib/obtenerGeolocalizacion'

import type { EjeTematico } from '@/types/eje-tematico.interface'
import type { Municipio } from '@/types/municipio.interface'
import type { Organizacion as Organizador } from '@/types/organizacion.interface'
import type { Promotor } from '@/types/promotor.interface'
import type { Seccion } from '@/types/seccion.interface'
import type { TipoLugar } from '@/types/tipo-lugares.interface'
import type { z } from 'zod'

type EventFormValues = z.infer<typeof eventSchema>

interface TipoEvento {
	id: number
	tipoEvento: string
}

interface Impacto {
	id: number
	impacto: string
}

export default function NewEventForm({
	dataTipoLugares,
	dataTipoEventos,
	dataOrganizadores,
	dataEjesTematicos,
	dataImpactos,
	dataMunicipios,
	dataSecciones,
	dataPromotores,
}: {
	dataTipoLugares: TipoLugar[]
	dataTipoEventos: TipoEvento[]
	dataOrganizadores: Organizador[]
	dataEjesTematicos: EjeTematico[]
	dataImpactos: Impacto[]
	dataMunicipios: Municipio[]
	dataSecciones: Seccion[]
	dataPromotores: Promotor[]
}) {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(false)

	const handleClick = async () => {
		try {
			const { latitud, longitud } = await obtenerGeolocalizacion()
			form.setValue('latitud', latitud)
			form.setValue('longitud', longitud)
		} catch (error) {
			console.error(error)
		}
	}

	const timeOptions = generateTimeOptions()

	const form = useForm<EventFormValues>({
		resolver: zodResolver(eventSchema),
		mode: 'onChange',
		defaultValues: {
			statusEvento: 'P',
		},
	})

	// filtrar secciones por municipio
	const municipio = form.watch('municipio')
	const secciones = dataSecciones?.filter(
		(seccion) => seccion.municipio.id === Number(municipio),
	)

	async function onSubmit(data: EventFormValues) {
		setIsLoading(true)

		try {
			const eventData = {
				evento: data.evento,
				descripcion: data.descripcion,
				lugar: data.lugar,
				statusEvento: data.statusEvento,
				fechaInicio: new Date(data.fechaInicio).toISOString().slice(0, 10),
				horaInicio: data.horaInicio,
				fechaFin: data.fechaFin && new Date(data.fechaFin).toISOString().slice(0, 10),
				horaFin: data.horaFin,
				asistentesEsperados: Number(data.asistentesEsperados),
				asistentesReales: Number(data.asistentesReales),
				latitud: data.latitud,
				longitud: data.longitud,
				localidad: data.localidad,
				calificacion: Number(data.calificacion),
				observaciones: data.observaciones,
				urlRedesSociales: data.urlRedesSociales,
				urlImagenPromocional: data.urlImagenPromocional,
				idTipoLugar: Number(data.tpLugar),
				idTipoEvento: Number(data.tpEvento),
				idOrganizador: Number(data.organizador),
				idEjeTematico: Number(data.ejeTematico),
				idImpacto: Number(data.impacto),
				idMunicipio: Number(data.municipio),
				idSeccion: Number(data.seccion),
				idPromotor: Number(data.promotor),
			}

			console.log(JSON.stringify(eventData))

			await axiosInstance.post('/eventos', eventData)

			toast.success('Evento registrado')

			navigate('/dashboard/eventos')
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
					name="evento"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre del Evento</FormLabel>
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
								Descripcion <OptionalBadge />
							</FormLabel>
							<FormControl>
								<Textarea className="resize-none" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tpEvento"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo Evento</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{dataTipoEventos?.map((item: TipoEvento) => (
											<SelectItem key={item.id} value={item.id.toString()}>
												{item.tipoEvento}
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
					name="organizador"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Organizador</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{dataOrganizadores?.map((item: Organizador) => (
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
					name="promotor"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Promotor</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{dataPromotores?.map((item: Promotor) => (
											<SelectItem key={item.id} value={item.id.toString()}>
												{item.nombre}
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
					name="ejeTematico"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Eje Tematico</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{dataEjesTematicos?.map((item: EjeTematico) => (
											<SelectItem key={item.id} value={item.id.toString()}>
												{item.ejeTematico}
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
					name="impacto"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Impacto</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{dataImpactos?.map((item: Impacto) => (
											<SelectItem key={item.id} value={item.id.toString()}>
												{item.impacto}
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
					name="statusEvento"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Estatus del evento</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="P">Programado</SelectItem>
										<SelectItem value="R">Realizado</SelectItem>
										<SelectItem value="C">Cancelado</SelectItem>
										<SelectItem value="D">Diferido</SelectItem>
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
						name="municipio"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Municipio</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
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
								<FormLabel>Seccion</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
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

				<FormField
					control={form.control}
					name="localidad"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Localidad <OptionalBadge />
							</FormLabel>
							<FormControl>
								<Input type="localidad" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid md:grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="asistentesEsperados"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Asistentes Esperados</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{form.watch('statusEvento') !== 'P' && (
						<FormField
							control={form.control}
							name="asistentesReales"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Asistentes Reales <OptionalBadge />
									</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>

				<div className="grid md:grid-cols-2 gap-5 mt-3">
					<div className="grid gap-5 border rounded-xl border-blue-300 p-5">
						<p className="font-semibold text-blue-500">Inicio del evento</p>
						<FormField
							control={form.control}
							name="fechaInicio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<CalendarIcon className="size-4" />
										Fecha
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
						<FormField
							control={form.control}
							name="horaInicio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										<ClockIcon className="size-4" />
										Hora
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{timeOptions.map((item) => (
													<SelectItem key={item} value={item}>
														{item}
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

					{form.watch('statusEvento') !== 'P' && (
						<div className="grid gap-5 border rounded-xl border-blue-300 p-5">
							<p className="font-semibold text-blue-500">Termino del evento</p>
							<FormField
								control={form.control}
								name="fechaFin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											<CalendarOffIcon className="size-4" />
											Fecha
											<OptionalBadge />
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
													disabled={(date) => date < form.getValues('fechaInicio')}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="horaFin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											<Clock9Icon className="size-4" />
											Hora
											<OptionalBadge />
										</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{timeOptions.map((item) => (
														<SelectItem key={item} value={item}>
															{item}
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
					)}
				</div>

				{form.watch('statusEvento') !== 'P' && (
					<FormField
						control={form.control}
						name="calificacion"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Calificacion <OptionalBadge />
								</FormLabel>
								<FormControl>
									<Input min={0} max={5} type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{form.watch('statusEvento') !== 'P' && (
					<FormField
						control={form.control}
						name="observaciones"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Observaciones <OptionalBadge />
								</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<div className="grid gap-5 mt-3 my-3">
					<div className="grid gap-5 border rounded-xl border-blue-300 p-5">
						<p className="font-semibold text-blue-500">Datos de localizacion</p>

						<div className="grid md:grid-cols-2 gap-5">
							<FormField
								control={form.control}
								name="latitud"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Latitud</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="longitud"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Longitud</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button onClick={handleClick}>Obtener ubicación</Button>

						<div className="grid md:grid-cols-3 gap-5">
							<FormField
								control={form.control}
								name="lugar"
								render={({ field }) => (
									<FormItem className="md:col-span-2">
										<FormLabel>
											<MapPinIcon className="size-4" />
											Lugar
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
								name="tpLugar"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo Lugar</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{dataTipoLugares?.map((item: TipoLugar) => (
														<SelectItem key={item.id} value={item.id.toString()}>
															{item.tipoLugar}
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
					</div>
				</div>

				<FormField
					control={form.control}
					name="urlRedesSociales"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Url Redes Sociales</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="urlImagenPromocional"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imagen promocional</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="my-3" disabled={isLoading || !form.formState.isValid}>
					{isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
					Registar Evento
				</Button>
			</form>
		</Form>
	)
}
