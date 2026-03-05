import { clsx } from 'clsx'
import { XIcon } from 'lucide-react'
import { FC } from 'react'

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { ITab } from '@/interfaces'
import { useTabsStore } from '@/stores'
import { menuItems } from './menuItems'

interface TabProps {
	tab: ITab
	index: number
}

const Tab: FC<TabProps> = (props) => {
	const { tab, index } = props
	const { id, title } = tab
	const { tabs, setTabs, activeTab, setActiveTab, removeTab } = useTabsStore()

	const handleContextMenuAction = (actionId: string) => {
		switch (actionId) {
			case 'close':
				removeTab(id)
				break
			case 'close-others':
				setTabs([tab])
				setActiveTab(tab)
				break
			case 'close-right':
				setTabs(tabs.slice(0, index + 1))
				setActiveTab(tab)
				break
			case 'close-left':
				setTabs(tabs.slice(index))
				setActiveTab(tab)
				break
			case 'close-all':
				setActiveTab(null)
				setTabs([])
				break
			default:
				break
		}
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<div
					className={clsx(
						// Base classes: Thêm group để làm hiệu ứng hover cho nút X, border right mờ để chia các tab
						'group h-full cursor-pointer relative shrink-0 min-w-max transition-all duration-200 flex items-center justify-between px-4 gap-3 select-none border-r border-gray-200 dark:border-gray-800',
						// Active vs Inactive
						id === activeTab?.id ?
							'text-primary bg-background shadow-sm before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-primary'
						:	'text-gray-500 bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-800/50',
					)}
					onClick={() => setActiveTab(tab)}>
					<div className='font-mono font-medium'>{title}</div>

					<button
						title='Close'
						className={clsx(
							'flex items-center justify-center rounded-md p-0.5 transition-all duration-200',
							id === activeTab?.id ?
								'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900'
							:	'text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800', // Ẩn nút X khi không active/không hover cho đỡ rối mắt
						)}
						onClick={(e) => {
							e.stopPropagation()
							removeTab(id)
						}}>
						<XIcon size={18} />
					</button>
				</div>
			</ContextMenuTrigger>

			<ContextMenuContent>
				{menuItems.map((item) => (
					<ContextMenuItem
						key={item.id}
						onClick={() => handleContextMenuAction(item.id)}>
						{item.title}
					</ContextMenuItem>
				))}
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default Tab
