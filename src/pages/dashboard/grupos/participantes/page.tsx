import Loader from '@/components/loader'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import AgregarParticipantesAGrupo from './agregar'
import ParticipantesTable from './participantes-table'

import type { Grupo } from '@/types/grupo.interface'

export default function DashboardGrupoParticipantes() {
	const { id } = useParams()

	const { data: dataGrupo } = useSWR<Grupo>(`/grupos/${id}`, fetcher)
	const { data: dataContactos } = useSWR('/contactos', fetcher)

	if (!dataGrupo) {
		return (
			<DasboardLayout>
				<Loader />
			</DasboardLayout>
		)
	}

	return (
		<DasboardLayout>
			<div className="flex md:flex-row flex-col gap-4 md:items-center justify-between mb-7">
				<h1 className="text-xl font-bold mb-7">
					Participantes del grupo:{' '}
					<span className="text-green-700">{dataGrupo.nombre}</span>
				</h1>

				<AgregarParticipantesAGrupo
					integrantes={dataGrupo.integrantes}
					grupoId={dataGrupo.id}
					contactos={dataContactos}
				/>
			</div>

			<ParticipantesTable data={dataGrupo.integrantes} />
		</DasboardLayout>
	)
}
