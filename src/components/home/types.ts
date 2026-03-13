import { ComponentType } from 'react'

export type IconComponent = ComponentType<{ className?: string }>

export interface DownloadItem {
	key: string
	label: string
	note: string
	href: string
	recommended: boolean
	Icon: IconComponent
}
