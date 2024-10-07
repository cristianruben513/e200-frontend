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
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { firebaseImageUpload } from '@/lib/firebaseImageUpload'
import { fotoSchema } from '@/validations/fotos'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon, LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { z } from 'zod'

import {
	UploadFileIcon,
	uploadFileContainer,
} from '@/components/uploadFileIcon'
import type { Evento } from '@/types/evento.interface'

type GaleriaFormValues = z.infer<typeof fotoSchema>

export default function NuevaFotoForm({
	dataEventos,
}: {
	dataEventos: Evento[]
}) {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(false)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)

	const form = useForm<GaleriaFormValues>({
		resolver: zodResolver(fotoSchema),
		mode: 'onChange',
	})

	async function onSubmit(data: GaleriaFormValues) {
		setIsLoading(true)

		try {
			const uploadedImage = await firebaseImageUpload(data.url[0], 'e200')

			const galeriaData = {
				idEvento: Number(data.evento),
				url: uploadedImage.url,
			}

			await axiosInstance.post('/fotos', galeriaData)
			toast.success('Foto subida correctamente')
			navigate('/dashboard/galeria')
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
							<FormLabel>Evento</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{dataEventos?.map((item) => (
											<SelectItem key={item.id} value={item.id.toString()}>
												{item.evento}
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
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imagen de la categoria</FormLabel>
							<FormControl>
								<div className="flex items-center justify-center gap-5">
									<Label className={uploadFileContainer}>
										<UploadFileIcon />
										<Input
											type="file"
											className="hidden"
											accept="image/*"
											name={field.name}
											onChange={(e) => {
												field.onChange(e.target.files)
												setSelectedImage(e.target.files?.[0] || null)
											}}
											ref={field.ref}
										/>
									</Label>
									{selectedImage ? (
										<img
											src={URL.createObjectURL(selectedImage)}
											alt="Selected"
											width={200}
											height={200}
											className="rounded-md object-cover w-40 h-40 border-2"
										/>
									) : (
										<div className="grid place-items-center w-40 h-40 bg-neutral-50 rounded-md border-2">
											<ImageIcon size={42} className="text-neutral-300" />
										</div>
									)}
								</div>
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
					Subir foto
				</Button>
			</form>
		</Form>
	)
}
