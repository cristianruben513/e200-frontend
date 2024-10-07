import axiosInstance from '@/axiosInstance'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { Contacto } from '@/types/contacto.interface'
import { LoaderIcon, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AgregarParticipantesAGrupo({
	integrantes,
	contactos,
	grupoId,
}: {
	integrantes: Contacto[] // Lista de contactos que ya son integrantes del grupo
	contactos: Contacto[] // Lista de contactos disponibles
	grupoId: number
}) {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedContacts, setSelectedContacts] = useState<number[]>([])

	useEffect(() => {
		const existingContactIds = integrantes.map((contacto) => contacto.id)
		setSelectedContacts(existingContactIds)
	}, [integrantes])

	const handleCheckboxChange = (id: number) => {
		setSelectedContacts((prevSelected) =>
			prevSelected.includes(id)
				? prevSelected.filter((contactoId) => contactoId !== id)
				: [...prevSelected, id],
		)
	}

	const handleAgregarContactos = async () => {
		setIsLoading(true)

		try {
			const response = await axiosInstance.post(
				`/grupos/${grupoId}/add-contacts`,
				{
					contactoIds: selectedContacts,
				},
			)

			if (response.status === 201) {
				toast.success('Contactos actualizados correctamente')
				window.location.reload()
			}
		} catch (error) {
			toast.error(`Error en el servidor: ${error}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button>
					Agregar Participantes
					<UserPlus className="size-4 ml-2" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Agregar contactos al grupo</AlertDialogTitle>
					<AlertDialogDescription>
						Selecciona los contactos que quieres agregar al grupo.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="grid gap-2 w-full my-3">
					{contactos.map((contacto) => (
						<div
							key={contacto.id}
							className="flex items-center gap-4 bg-neutral-200 p-2 rounded-lg"
						>
							<input
								type="checkbox"
								checked={selectedContacts.includes(contacto.id)}
								onChange={() => handleCheckboxChange(contacto.id)}
							/>
							<div>{contacto.nombre}</div>
						</div>
					))}
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>Cerrar</AlertDialogCancel>
					<Button
						disabled={selectedContacts.length === 0 || isLoading}
						onClick={handleAgregarContactos}
					>
						Actualizar Participantes
						{isLoading && <LoaderIcon className="ml-2 size-4 animate-spin" />}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
