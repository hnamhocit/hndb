import { clsx } from 'clsx'
import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

interface RowProps {
	i: number
	columns: string[]
	row: Record<string, unknown>
}

const Row = ({ i, columns, row }: RowProps) => {
	const [isHover, setIsHover] = useState(false)

	return (
		<tr
			className='odd:bg-primary/5 hover:bg-primary/10 transition-colors duration-150'
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}>
			<td className='border p-2 select-none text-neutral-500 font-mono text-center'>
				<div className='flex items-center justify-center gap-4'>
					<span className='min-w-5'>{i + 1}</span>

					<div
						className={clsx(
							'flex items-center gap-4 transition-all duration-300',
							isHover ?
								'opacity-100 visible'
							:	'opacity-0 invisible',
						)}>
						<Checkbox className='w-6 h-6 bg-white' />

						<button
							title='re-arrange'
							className='cursor-pointer'>
							<EllipsisVerticalIcon size={20} />
						</button>
					</div>
				</div>
			</td>

			{columns.map((col) => (
				<td
					key={col}
					className='border p-2 select-none text-neutral-600 font-mono dark:text-neutral-400'>
					{row[col] === null ?
						<span className='italic text-neutral-400'>[NULL]</span>
					:	String(row[col])}
				</td>
			))}
		</tr>
	)
}

export default Row
