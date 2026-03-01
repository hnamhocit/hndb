import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { IColumn, IDataSource } from '@/interfaces'

interface DataSourcesStore {
	datasources: IDataSource[]
	setDatasources: (datasources: IDataSource[]) => void

	selectedId: string | null
	setSelectedId: (id: string | null) => void

	databases: string[]
	setDatabases: (databases: string[]) => void

	isDatabaseLoading: boolean
	setIsDatabaseLoading: (isLoading: boolean) => void

	schema: Record<string, IColumn[]>
	setSchema: (schema: Record<string, IColumn[]>) => void

	isSchemaLoading: boolean
	setIsSchemaLoading: (isLoading: boolean) => void

	currentDatabase: string | null
	setCurrentDatabase: (db: string | null) => void

	currentTable: string | null
	setCurrentTable: (table: string | null) => void
}

export const useDataSourcesStore = create<DataSourcesStore>()(
	persist(
		(set) => ({
			datasources: [],
			setDatasources: (datasources) => set({ datasources }),

			selectedId: null,
			setSelectedId: (selectedId) => set({ selectedId }),

			databases: [],
			setDatabases: (databases) => set({ databases }),

			isDatabaseLoading: false,
			setIsDatabaseLoading: (isDatabaseLoading) =>
				set({ isDatabaseLoading }),

			schema: {},
			setSchema: (schema) => set({ schema }),

			isSchemaLoading: false,
			setIsSchemaLoading: (isSchemaLoading) => set({ isSchemaLoading }),

			currentDatabase: null,
			setCurrentDatabase: (currentDatabase) => set({ currentDatabase }),

			currentTable: null,
			setCurrentTable: (currentTable) => set({ currentTable }),
		}),
		{
			name: 'datasources-store',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				selectedId: state.selectedId,
				currentDatabase: state.currentDatabase,
				currentTable: state.currentTable,
				schema: state.schema,
			}),
		},
	),
)
