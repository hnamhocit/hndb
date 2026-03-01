import { useDataSourcesStore } from '@/stores'

export const getDbPath = (path: string) => {
	const state = useDataSourcesStore.getState()
	const { currentDatabase, selectedId, currentTable } = state

	return `/data_sources/${selectedId}/databases/${currentDatabase}/tables/${currentTable}/${path}`
}
