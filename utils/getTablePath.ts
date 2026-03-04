import { useDataSourcesStore } from '@/stores'

export const getTablePath = (path?: string) => {
	const state = useDataSourcesStore.getState()
	const { database, dataSourceId, table } = state

	let tablePath = `/data_sources/${dataSourceId}/databases/${database}/tables/${table}`

	if (path) {
		tablePath += `/${path}`
	}

	return tablePath
}
