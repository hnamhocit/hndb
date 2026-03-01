import clsx from 'clsx'
import {
	ArrowDownToLineIcon,
	DatabaseIcon,
	HistoryIcon,
	PlayIcon,
	SaveIcon,
	TimerIcon,
	WandSparklesIcon,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/config'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { exportToCsv, notifyError } from '@/utils'
import QueryTable from '../QueryTable'
import { Button } from '../ui/button'
import ExecutionLog from './ExecutionLog'
import QueryPlan from './QueryPlan'
import SQLEditor from './SQLEditor'

const tabs = [
	{
		id: 'results',
		title: 'Results',
	},
	{
		id: 'execution-log',
		title: 'Execution Log',
	},
	{
		id: 'query-plan',
		title: 'Query Plan',
	},
]

const QueryBuilder = () => {
	const { contentById, activeTab } = useTabsStore()
	const { currentDatabase, selectedId, datasources } = useDataSourcesStore()
	const [currentTab, setCurrentTab] = useState('results')
	const [isLoading, setIsLoading] = useState(false)
	const [result, setResult] = useState(null)

	if (!activeTab) return

	const handleRunQuery = async () => {
		setIsLoading(true)

		if (!selectedId) {
			toast.error('No data source selected', {
				position: 'top-center',
			})
			return
		}

		try {
			const query = contentById[activeTab.id] || ''
			const { data } = await api.post(
				`/data_sources/${selectedId}/databases/${currentDatabase}/query`,
				{
					query,
				},
			)

			setResult(data.data)
		} catch (error) {
			notifyError(error, 'Failed to run query')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col h-full'>
			<div className='flex items-center justify-between p-4 border-b'>
				<div className='flex items-center gap-4'>
					<Button
						onClick={handleRunQuery}
						disabled={isLoading}>
						<PlayIcon />
						Execute
					</Button>

					<div className='w-0.5 h-6 bg-neutral-400'></div>

					<Button
						size='icon'
						variant='ghost'>
						<SaveIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<WandSparklesIcon />
					</Button>

					<Button
						size='icon'
						variant='ghost'>
						<HistoryIcon />
					</Button>
				</div>

				<div className='flex items-center gap-4 text-sm'>
					<div className='text-neutral-700'>Dialect:</div>
					<div className='py-2 px-4 rounded bg-primary text-white uppercase font-mono'>
						{datasources.find((ds) => ds.id === selectedId)?.type ||
							'-'}
					</div>
				</div>
			</div>

			<SQLEditor />

			{result && (
				<>
					{/* Thanh Tabs & Stats (Đã thêm border-b để tách biệt với nội dung bên dưới) */}
					<div className='flex items-center justify-between pt-2 px-4 shrink-0 border-b dark:border-slate-800'>
						<div className='flex items-center gap-4'>
							{tabs.map((tab) => (
								<div
									key={tab.id}
									className={clsx(
										'py-2 px-4 cursor-pointer transition-colors',
										{
											'border-b-2 border-primary text-primary font-bold':
												currentTab === tab.id,
											'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 font-semibold':
												currentTab !== tab.id,
										},
									)}
									onClick={() => setCurrentTab(tab.id)}>
									{tab.title}
								</div>
							))}
						</div>

						{/* Stats chỉ hiện ở tab Results */}
						{currentTab === 'results' && (
							<div className='flex items-center gap-4 text-neutral-700 dark:text-neutral-400 font-mono font-medium text-sm'>
								<div className='flex items-center gap-2'>
									<TimerIcon size={16} />
									<div>
										{result.durationMs?.toFixed(2) || 0}ms
									</div>
								</div>

								<div className='flex items-center gap-2'>
									<DatabaseIcon size={16} />
									<div>{result.rows.length || 0} rows</div>
								</div>

								<div className='w-0.5 h-4 bg-neutral-300 dark:bg-neutral-700'></div>

								<div
									className='flex items-center gap-2 cursor-pointer hover:text-primary transition-colors'
									onClick={() => {
										const timestamp = new Date()
											.toISOString()
											.replace(/[:.]/g, '-')
										exportToCsv(
											`query-result-${timestamp}`,
											result.rows as Record<
												string,
												unknown
											>[],
										)
									}}>
									<ArrowDownToLineIcon size={16} />
									<div>CSV</div>
								</div>
							</div>
						)}
					</div>

					{/* Khu vực Render Nội dung theo Tab */}
					<div className='flex-1 overflow-hidden bg-white dark:bg-[#090b10] relative'>
						{currentTab === 'results' && (
							<QueryTable
								columns={Object.keys(result.rows[0] || [])}
								rows={result.rows || []}
							/>
						)}

						{currentTab === 'execution-log' && (
							<ExecutionLog
								result={result}
								query={contentById[activeTab.id]}
							/>
						)}

						{currentTab === 'query-plan' && (
							<QueryPlan query={contentById[activeTab.id]} />
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default QueryBuilder
