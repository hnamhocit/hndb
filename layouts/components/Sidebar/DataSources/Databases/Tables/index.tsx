import clsx from 'clsx'
import { CornerDownLeftIcon } from 'lucide-react'

import { AccordionContent } from '@/components/ui/accordion'
import { ITab } from '@/interfaces'
import { useDataSourcesStore, useTabsStore } from '@/stores'

interface TablesProps {
	database: string
}

const Tables = ({ database }: TablesProps) => {
	const {
		schema,
		currentDatabase,
		isSchemaLoading,
		setCurrentTable,
		currentTable,
	} = useDataSourcesStore()
	const { tabs, setTabs, setActiveTab } = useTabsStore()

	return (
		<AccordionContent>
			{database === currentDatabase &&
				(isSchemaLoading ?
					<div className='text-center text-gray-500'>
						Loading tables...
					</div>
				: !schema ?
					<div className='text-center text-gray-500'>
						No schema data.
					</div>
				: schema && Object.keys(schema).length === 0 ?
					<div className='text-center text-gray-500'>
						No tables found.
					</div>
				:	Object.keys(schema).map((table) => (
						<div
							onClick={(e) => {
								e.stopPropagation()

								const id = `${currentDatabase}-${table}`
								const newTab: ITab = {
									id,
									type: 'table',
									title: table,
								}

								setActiveTab(newTab)
								setCurrentTable(table)

								if (tabs.find((tab) => tab.id === id)) {
									return
								}

								setTabs([...tabs, newTab])
							}}
							key={table}
							className={clsx(
								'select-none flex items-center justify-between gap-4 py-2 px-4 hover:text-primary transition-colors duration-300 cursor-pointer font-mono text-lg',
								currentTable === table ? 'text-primary' : (
									'text-gray-500'
								),
							)}>
							{table}
							{currentTable === table && <CornerDownLeftIcon />}
						</div>
					)))}
		</AccordionContent>
	)
}

export default Tables
