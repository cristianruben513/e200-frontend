import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

interface UseAxiosProps<T> {
	data: T | null
	error: AxiosError | null
	loading: boolean
}

function useAxios<T>(config: AxiosRequestConfig): UseAxiosProps<T> {
	const [data, setData] = useState<T | null>(null)
	const [error, setError] = useState<AxiosError | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response: AxiosResponse<T> = await axiosInstance(config)
				setData(response.data)
			} catch (err) {
				setError(err as AxiosError)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [config])

	return { data, error, loading }
}

export default useAxios
