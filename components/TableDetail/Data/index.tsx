import { CheckCircle2Icon, HardDriveIcon, KeyboardIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import DatabaseTable from '@/components/DatabaseTable'
import { api } from '@/config'
import { useTabsStore } from '@/stores'
import { useDataSourcesStore } from '@/stores/datasources.store'
import { formatDataSize, notifyError } from '@/utils'
import Actions from './Actions'

const Data = () => {
	const { activeTab } = useTabsStore()
	const { currentDatabase, currentTable, schema, selectedId } =
		useDataSourcesStore()
	const [result, setResult] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [keys, setKeys] = useState<(string | number)[]>([])

	const columns = schema[currentTable || ''] || []
	const primaryColumnName =
		columns.find((col) => col.is_primary)?.column_name || 'id'

	const refreshData = useCallback(async () => {
		if (!activeTab || !currentDatabase || !currentTable || !selectedId)
			return

		setIsLoading(true)

		try {
			const { data } = await api.get(
				`/data_sources/${selectedId}/databases/${currentDatabase}/tables/${currentTable}/preview?page=1`,
			)

			setResult(data.data)
		} catch (error) {
			notifyError(error, 'Failed to fetch table preview.')
		} finally {
			setIsLoading(false)
		}
	}, [activeTab, currentDatabase, currentTable, selectedId])

	useEffect(() => {
		refreshData()
	}, [refreshData])

	return (
		<>
			<Actions
				keys={keys}
				setKeys={setKeys}
				refreshData={refreshData}
				primaryColumnName={primaryColumnName}
				columns={columns}
			/>

			{isLoading ?
				<div className='w-full h-64 flex items-center justify-center gap-2 text-primary'>
					<CheckCircle2Icon
						size={18}
						className='animate-spin'
					/>
					<span>Loading data...</span>
				</div>
			:	<DatabaseTable
					columns={columns}
					rows={result?.rows || []}
					keys={keys}
					setKeys={setKeys}
					primaryColumnName={primaryColumnName}
				/>
			}

			{result && !isLoading && (
				<div className='shrink-0 p-4 flex items-center justify-between border-t bg-neutral-50 dark:bg-neutral-900'>
					<div className='flex items-center gap-2'>
						<CheckCircle2Icon
							className='text-green-600'
							size={18}
						/>

						<div className='text-sm text-neutral-600 dark:text-neutral-300'>
							<span className='font-semibold'>
								{result.rows?.length}
							</span>{' '}
							rows affected in{' '}
							<span className='font-semibold'>
								{result.durationMs?.toFixed(2)}
							</span>{' '}
							ms
						</div>
					</div>

					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300'>
							<HardDriveIcon />
							<span>
								Memory: {formatDataSize(result.sizeBytes || 0)}
							</span>
						</div>

						<div className='w-0.5 h-8 bg-neutral-600 dark:bg-neutral-700'></div>

						<div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300'>
							<KeyboardIcon />
							<span>UTF8</span>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Data
