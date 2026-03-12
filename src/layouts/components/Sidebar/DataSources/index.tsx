'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useEffect } from 'react'
import { toast } from 'sonner'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

import { supportDataSources } from '@/constants/supportDataSources'
import { dataSourcesService } from '@/services'
import { useDataSourcesStore, useUserStore } from '@/stores'
import { notifyError } from '@/utils'
import DataSourceContextMenu from './DataSourceContextMenu'
import Databases from './Databases'

const DataSources = () => {
	const {
		datasources,
		setDatasources,
		connectionStatuses,
		updateDataSourceStatus,
		setBulkConnectionStatuses,
		dataSourceId,
		setDataSourceId,
	} = useDataSourcesStore()

	const { user } = useUserStore()

	useEffect(() => {
		;(async () => {
			try {
				if (!user) return

				const { data, error } =
					await dataSourcesService.getDataSourcesByUserId(user.id)

				if (error) {
					toast.error(error.message, { position: 'top-center' })
					return
				}

				if (data) {
					setDatasources(data)

					const { data: statusData } =
						await dataSourcesService.getBulkStatus(
							data.map((ds) => ds.id),
						)

					if (statusData) {
						setBulkConnectionStatuses(statusData.data)
					}
				}
			} catch (error) {
				notifyError(error, 'Failed to fetch data sources.')
			}
		})()
	}, [user, setDatasources, setBulkConnectionStatuses])

	useEffect(() => {
		const sse = new EventSource(
			`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/data_sources/stream-status`,
		)

		sse.onmessage = (event) => {
			const data = JSON.parse(event.data)
			updateDataSourceStatus(data.id, data.status)
		}

		return () => {
			sse.close()
		}
	}, [updateDataSourceStatus])

	return (
		<Accordion
			type='single'
			collapsible
			value={dataSourceId || undefined}
			onValueChange={(value) => setDataSourceId(value || null)}>
			{datasources.map((ds) => {
				const supportDataSource = supportDataSources.find(
					(s) => s.id === ds.type,
				)

				const isConnected = connectionStatuses[ds.id]

				return (
					<AccordionItem
						key={ds.id}
						className='px-4 border-b-0'
						value={ds.id}>
						<DataSourceContextMenu ds={ds}>
							<AccordionTrigger className='hover:no-underline'>
								<div className='flex items-center gap-4 flex-1'>
									<div className='relative shrink-0'>
										<Image
											src={
												supportDataSource?.photoURL ||
												'/logo.png'
											}
											alt={`${supportDataSource?.name} Logo`}
											width={28}
											height={28}
											className={clsx(
												'transition-all duration-300',
												!isConnected &&
													'grayscale opacity-60',
											)}
										/>

										<span
											className={clsx(
												'absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full border-2 border-background transition-colors duration-300',
												isConnected ? 'bg-green-500' : (
													'bg-gray-400'
												),
											)}
											title={
												isConnected ? 'Connected' : (
													'Disconnected'
												)
											}
										/>
									</div>

									<span
										className={clsx(
											'text-lg font-mono font-medium truncate transition-colors duration-300',
											!isConnected && 'text-gray-500',
										)}>
										{ds.name || ds.type}
									</span>
								</div>
							</AccordionTrigger>
						</DataSourceContextMenu>

						<AccordionContent>
							<Databases
								dataSourceId={ds.id}
								autoFetch={dataSourceId === ds.id}
							/>
						</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}

export default DataSources
