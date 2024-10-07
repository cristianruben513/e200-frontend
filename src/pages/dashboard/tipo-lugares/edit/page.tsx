import Loader from '@/components/loader'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import type { TipoLugar } from '@/types/tipo-lugares.interface'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import EditarTipoLugarForm from './form'

export default function DashboardEditarTipoLugar() {
	const { id } = useParams()
	const { data, isValidating } = useSWR<TipoLugar>(
		`/tipo-lugares/${id}`,
		fetcher,
	)

	if (isValidating || !data) {
		return (
			<DasboardLayout>
				<Loader />
			</DasboardLayout>
		)
	}

	return (
		<DasboardLayout>
			<h1 className="text-xl font-bold mb-7">Editar Tipo de lugar</h1>

			<EditarTipoLugarForm dataTipoLugar={data} />
		</DasboardLayout>
	)
}
