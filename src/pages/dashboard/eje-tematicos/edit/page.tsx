import Loader from '@/components/loader'
import DasboardLayout from '@/layouts/dashboard'
import { fetcher } from '@/lib/fetcher'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import EditarEjeTematicoForm from './form'

export default function DashboardEditarEjeTematico() {
	const { id } = useParams()
	const { data, isValidating } = useSWR(`/eje-tematicos/${id}`, fetcher)

	if (isValidating || !data) {
		return (
			<DasboardLayout>
				<Loader />
			</DasboardLayout>
		)
	}

	return (
		<DasboardLayout>
			<h1 className="text-xl font-bold mb-7">Editar Eje tematico</h1>
			<EditarEjeTematicoForm dataEje={data} />
		</DasboardLayout>
	)
}
