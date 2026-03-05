import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { AccordionContent } from '@/components/ui/accordion'
import { api } from '@/config'
import { ITab } from '@/interfaces'
import { useDataSourcesStore, useTabsStore } from '@/stores'
import { notifyError } from '@/utils'
import { CornerDownLeftIcon, Table2Icon } from 'lucide-react'

interface TablesProps {
	database: string
}

const Tables = ({ database }: TablesProps) => {
	const {
		setTable,
		table,
		dataSourceId,
		cachedSchema,
		setCachedSchema,
		database: globalActiveDatabase,
	} = useDataSourcesStore()
	const { tabs, setTabs, setActiveTab } = useTabsStore()
	const [isLoading, setIsLoading] = useState(false)

	const cacheKey = `${dataSourceId}-${database}`
	const hasCachedData = !!cachedSchema[cacheKey]

	const isAccordionOpen = globalActiveDatabase === database

	useEffect(() => {
		if (!dataSourceId || !isAccordionOpen || hasCachedData) return

		const fetchSchema = async () => {
			setIsLoading(true)

			try {
				const { data } = await api.get(
					`/data_sources/${dataSourceId}/databases/${database}/schema`,
				)
				setCachedSchema(cacheKey, data.data)
			} catch (error) {
				notifyError(error, 'Failed to fetch schema.')
			} finally {
				setIsLoading(false)
			}
		}

		fetchSchema()
	}, [
		dataSourceId,
		database,
		isAccordionOpen,
		hasCachedData,
		cacheKey,
		setCachedSchema,
	])

	const tableList =
		cachedSchema[cacheKey] ? Object.keys(cachedSchema[cacheKey]) : []

	return (
		<AccordionContent>
			{isLoading ?
				<div className='text-center text-gray-500 py-2'>
					Loading tables...
				</div>
			: tableList.length === 0 ?
				<div className='text-center text-gray-500 py-2'>
					No tables found.
				</div>
			:	tableList.map((t) => (
					<div
						onClick={(e) => {
							e.stopPropagation()

							const id = `${dataSourceId}-${database}-${t}`
							const newTab: ITab = {
								id,
								type: 'table',
								title: t,
								dataSourceId: dataSourceId,
								database: database,
								table: t,
							}

							setActiveTab(newTab)
							setTable(t)

							if (tabs.find((tab) => tab.id === id)) return

							setTabs([...tabs, newTab])
						}}
						key={t}
						className={clsx(
							// Base classes
							'relative select-none flex items-center justify-between gap-4 py-2 px-4 transition-all duration-200 cursor-pointer font-mono text-base',
							// Active vs Inactive classes
							table === t && globalActiveDatabase === database ?
								'text-primary bg-linear-to-r from-primary/10 to-transparent font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-0.75 before:bg-primary before:rounded-r-full'
							:	'text-gray-500 hover:text-primary hover:bg-gray-50/50 dark:hover:bg-gray-800/30',
						)}>
						<div className='flex items-center gap-3'>
							<Table2Icon />

							<span className='truncate'>{t}</span>
						</div>

						{/* Icon */}
						{table === t && globalActiveDatabase === database && (
							<CornerDownLeftIcon
								size={16}
								className='text-primary/70'
							/>
						)}
					</div>
				))
			}
		</AccordionContent>
	)
}

export default Tables
