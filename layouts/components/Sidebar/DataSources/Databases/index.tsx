import { DatabaseIcon, DatabaseZapIcon } from 'lucide-react'
import { useEffect } from 'react'

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
	const {
		databases,
		setDatabases,
		selectedId,
		isDatabaseLoading,
		setIsDatabaseLoading,
		currentDatabase,
		setCurrentDatabase,
		setSchema,
		setIsSchemaLoading,
	} = useDataSourcesStore()

	useEffect(() => {
		;(async () => {
			if (!selectedId) return

			setIsDatabaseLoading(true)

			try {
				const { data } = await api.get(
					`/data_sources/${selectedId}/databases`,
				)
				setDatabases(data.data)
			} catch (error) {
				notifyError(error, 'Failed to fetch databases.')
			} finally {
				setIsDatabaseLoading(false)
			}
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedId])

	useEffect(() => {
		if (!selectedId || !currentDatabase) return

		setIsSchemaLoading(true)
		;(async () => {
			try {
				const { data } = await api.get(
					`/data_sources/${selectedId}/databases/${currentDatabase}/schema`,
				)

				setSchema(data.data)
			} catch (error) {
				notifyError(error, 'Failed to fetch schema.')
			} finally {
				setIsSchemaLoading(false)
			}
		})()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentDatabase, selectedId])

	return (
		<AccordionContent>
			{isDatabaseLoading ?
				<div className='text-center text-gray-500'>
					Loading databases...
				</div>
			:	<Accordion
					type='single'
					collapsible>
					{databases.length === 0 ?
						<div className='text-center text-gray-500'>
							No databases found.
						</div>
					:	databases.map((database) => (
							<AccordionItem
								value={database}
								key={database}>
								<AccordionTrigger
									onClick={() =>
										setCurrentDatabase(database)
									}>
									<div className='flex items-center gap-4 font-mono text-lg font-medium'>
										{database === currentDatabase ?
											<DatabaseZapIcon />
										:	<DatabaseIcon />}
										{database}
									</div>
								</AccordionTrigger>

								<Tables database={database} />
							</AccordionItem>
						))
					}
				</Accordion>
			}
		</AccordionContent>
	)
}

export default Databases
