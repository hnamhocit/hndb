import { useEffect, useState } from 'react'

import { api } from '@/config'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { notifyError } from '@/utils'

export const useSchema = () => {
	const { activeTab } = useTabsStore()
	const { cachedSchema, setCachedSchema } = useDataSourcesStore()
	const [isLoading, setIsLoading] = useState(false)

	const cacheKey = `${activeTab!.dataSourceId}-${activeTab!.database}`
	const hasCachedSchema = !!cachedSchema[cacheKey]
	const schema = cachedSchema[cacheKey] || {}

	useEffect(() => {
		const getSchema = async () => {
			if (!activeTab) return

			setIsLoading(true)

			try {
				const { data } = await api.get(
					`/data_sources/${activeTab.dataSourceId}/databases/${activeTab.database}/schema`,
				)

				setCachedSchema(cacheKey, data.data)
			} catch (error) {
				notifyError(error, 'Failed to fetch schema.')
			} finally {
				setIsLoading(false)
			}
		}

		if (!hasCachedSchema) {
			getSchema()
		}
	}, [activeTab, hasCachedSchema, cacheKey])

	return { schema, isLoading, hasCachedSchema }
}
