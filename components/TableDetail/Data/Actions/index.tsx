import {
	CopyPlusIcon,
	FileUpIcon,
	PenIcon,
	PlayIcon,
	PlusIcon,
	RotateCcwIcon,
	SettingsIcon,
	Trash2Icon,
} from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { api } from '@/config'
import { IColumn } from '@/interfaces'
import { useDataSourcesStore } from '@/stores'
import { notifyError } from '@/utils'
import RecordModal from './RecordModal'

interface ActionsProps {
	keys: (string | number)[]
	setKeys: Dispatch<SetStateAction<(string | number)[]>>
	refreshData: () => Promise<void>
	columns: IColumn[]
	primaryColumnName: string
}

const Actions = ({
	keys,
	setKeys,
	refreshData,
	primaryColumnName,
	columns,
}: ActionsProps) => {
	const [isDeleting, setIsDeleting] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const { currentDatabase, currentTable, selectedId } = useDataSourcesStore()

	const toggleIsOpen = () => setIsOpen((prev) => !prev)

	const handleDelete = async () => {
		const selectedKeys = keys

		if (selectedKeys.length === 0) return

		setIsDeleting(true)

		try {
			const formattedKeys = selectedKeys
				.map((k) => (typeof k === 'string' ? `'${k}'` : k))
				.join(', ')
			const sql = `DELETE FROM ${currentTable} WHERE ${primaryColumnName} IN (${formattedKeys});`

			await api.post(
				`/data_sources/${selectedId}/databases/${currentDatabase}/query`,
				{ query: sql },
			)

			await refreshData()

			setKeys([])
			toast.success(`Deleted ${selectedKeys.length} row(s)!`)
		} catch (error) {
			notifyError(error, 'Failed to delete rows.')
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<div className='flex items-center justify-between p-4 border-b'>
			<div className='flex items-center gap-3'>
				<Button
					onClick={toggleIsOpen}
					size='icon'
					variant='ghost'>
					<PlusIcon />
				</Button>

				<RecordModal
					isOpen={isOpen}
					onOpenChange={toggleIsOpen}
					columns={columns}
					onSubmit={(sql) => {
						console.log({ sql })
					}}
				/>

				<Button
					size='icon'
					variant='ghost'>
					<PenIcon />
				</Button>

				<Button
					size='icon'
					variant='ghost'>
					<CopyPlusIcon />
				</Button>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							disabled={isDeleting}
							size='icon'
							variant='ghost'>
							<Trash2Icon />
						</Button>
					</AlertDialogTrigger>

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you sure you want to delete?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. There will be{' '}
								<strong className='text-foreground'>
									{keys.length} row(s)
								</strong>{' '}
								deleted and permanently removed from the
								Database.
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>

							<AlertDialogAction
								onClick={handleDelete}
								className='bg-red-600 hover:bg-red-700 text-white'>
								Confirm
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				<div className='w-0.5 h-8 bg-black'></div>

				<Button
					onClick={refreshData}
					size='icon'
					variant='ghost'>
					<RotateCcwIcon />
				</Button>

				<Button
					size='icon'
					variant='ghost'>
					<FileUpIcon />
				</Button>

				<Button
					size='icon'
					variant='ghost'>
					<SettingsIcon />
				</Button>
			</div>

			<Button>
				<PlayIcon />
				<span>Execute query</span>
			</Button>
		</div>
	)
}

export default Actions
