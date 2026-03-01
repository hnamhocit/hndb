import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const notifyError = (error: unknown, fallbackMessage: string) => {
	if (error instanceof AxiosError) {
		if ('error' in error.response?.data) {
			toast.error(error.response?.data.error)
		}

		return
	}

	toast.error(fallbackMessage)
}
