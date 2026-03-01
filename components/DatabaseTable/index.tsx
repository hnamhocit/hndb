import { CircleIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { IColumn } from '@/interfaces'
import { getTypeInfo } from '@/utils'
import Row from './Row'

interface DatabaseTableProps {
	columns: IColumn[]
	rows: Record<string, unknown>[]
	keys: (string | number)[]
	setKeys: Dispatch<SetStateAction<(string | number)[]>>
	primaryColumnName: string
}

const DatabaseTable = ({
	columns,
	rows,
	keys,
	setKeys,
	primaryColumnName,
}: DatabaseTableProps) => {
	return (
		<div className='flex-1 overflow-auto min-h-0'>
			<table className='w-full border-collapse whitespace-nowrap'>
				<thead>
					<tr>
						<th className='border p-2 sticky top-0 bg-primary z-10'>
							<CircleIcon className='text-white mx-auto' />
						</th>

						{columns.map((col) => {
							const { icon: Icon } = getTypeInfo(col.data_type)

							return (
								<th
									key={col.column_name}
									className='border p-2 text-left select-none sticky top-0 bg-primary text-primary-foreground z-10'>
									<div className='text-lg font-semibold'>
										{col.column_name}
									</div>

									<div className='flex items-center gap-2 text-neutral-300 dark:text-neutral-700'>
										<Icon size={18} />
										<div className='text-sm uppercase'>
											{col.data_type}
										</div>
									</div>
								</th>
							)
						})}
					</tr>
				</thead>
				<tbody>
					{rows?.map((row, i) => (
						<Row
							key={i}
							keys={keys}
							setKeys={setKeys}
							columns={columns}
							row={row}
							primaryColumnName={primaryColumnName}
							i={i}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DatabaseTable
