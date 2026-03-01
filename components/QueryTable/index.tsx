import { CircleIcon } from 'lucide-react'

import Row from './Row'

interface QueryTableProps {
	columns: string[]
	rows: Record<string, unknown>[]
}

const QueryTable = ({ columns, rows }: QueryTableProps) => {
	return (
		<div className='w-full h-full overflow-auto'>
			<table className='w-full border-collapse whitespace-nowrap'>
				<thead>
					<tr>
						<th className='border p-2 sticky top-0 bg-primary z-10'>
							<CircleIcon className='text-white mx-auto' />
						</th>

						{columns.map((col) => (
							<th
								key={col}
								className='border p-2 text-left select-none sticky top-0 bg-primary text-white z-10'>
								<div className='text-lg font-semibold'>
									{col}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows?.map((row, i) => (
						<Row
							key={i}
							columns={columns}
							row={row}
							i={i}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default QueryTable
