import clsx from 'clsx'
import { DatabaseIcon, DatabaseZapIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { api } from '@/config'
import { useDataSourcesStore } from '@/stores'
import { notifyError } from '@/utils'
import Tables from './Tables'

const Databases = () => {
	const [isLoading, setIsLoading] = useState(false)
	const fetchLock = useRef<string | null>(null)

	const {
		cachedDatabases,
		setCachedDatabases,
		dataSourceId,
		setDatabase,
		database,
	} = useDataSourcesStore()

	const hasCachedData = !!(dataSourceId && cachedDatabases[dataSourceId])

	useEffect(() => {
		;(async () => {
			if (!dataSourceId || hasCachedData) return

			if (fetchLock.current === dataSourceId) return

			const fetchDatabases = async () => {
				setIsLoading(true)
				fetchLock.current = dataSourceId // Đóng khóa lại

				try {
					const { data } = await api.get(
						`/data_sources/${dataSourceId}/databases`,
					)
					setCachedDatabases(dataSourceId, data.data)
				} catch (error) {
					notifyError(error, 'Failed to fetch databases.')
					fetchLock.current = null // Nếu lỗi thì mở khóa ra để user có thể thử lại
				} finally {
					setIsLoading(false)
				}
			}

			fetchDatabases()
		})()
	}, [dataSourceId, hasCachedData, setCachedDatabases])

	return (
		<AccordionContent>
			{isLoading ?
				<div className='text-center text-gray-500'>
					Loading databases...
				</div>
			:	<Accordion
					type='single'
					collapsible>
					{cachedDatabases[dataSourceId!]?.length === 0 ?
						<div className='text-center text-gray-500'>
							No databases found.
						</div>
					:	cachedDatabases[dataSourceId!]?.map((db) => (
							<AccordionItem
								value={db}
								key={db}>
								<AccordionTrigger
									onClick={() => setDatabase(db)}>
									<div
										className={clsx(
											'flex items-center gap-4 font-mono text-lg font-medium',
											database === db ? 'text-primary' : (
												'text-gray-700 dark:text-gray-500'
											),
										)}>
										{database === db ?
											<DatabaseZapIcon size={18} />
										:	<DatabaseIcon size={18} />}
										{db}
									</div>
								</AccordionTrigger>

								<Tables database={db} />
							</AccordionItem>
						))
					}
				</Accordion>
			}
		</AccordionContent>
	)
}

export default Databases
