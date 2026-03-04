import { useEffect, useState } from 'react'

import { api } from '@/config'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { getTablePath, notifyError } from '@/utils'

export const useRelationships = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { activeTab } = useTabsStore()
	const { cachedRelationships, setCachedRelationships } =
		useDataSourcesStore()

	const cacheKey = `${activeTab!.dataSourceId}-${activeTab!.database}-${activeTab!.table}`
	const relationships = cachedRelationships[cacheKey] || []
	const hasRelationships = !!cachedRelationships[cacheKey]

	useEffect(() => {
		if (hasRelationships) return

		const fetchRels = async () => {
			setIsLoading(true)

			try {
				const { data } = await api.get(getTablePath('relationships'))
				setCachedRelationships(cacheKey, data.data || [])
			} catch (error) {
				notifyError(error, 'Failed to fetch relationships.')
			} finally {
				setIsLoading(false)
			}
		}

		fetchRels()
	}, [cachedRelationships, cacheKey, hasRelationships])

	return { relationships, isLoading, hasRelationships }
}
