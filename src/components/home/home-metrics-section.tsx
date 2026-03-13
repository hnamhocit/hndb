'use client'

import { useMemo } from 'react'

import { useLang } from '@/lib/use-lang'
import { BoltIcon, LayersIcon, ShieldIcon } from 'lucide-react'

import { iconBadgeClass, homePanelClass } from './shared'

export function HomeMetricsSection() {
	const { t } = useLang()

	const metrics = useMemo(
		() => [
			{
				label: t('stats.firstLabel'),
				text: t('stats.firstText'),
				Icon: BoltIcon,
			},
			{
				label: t('stats.secondLabel'),
				text: t('stats.secondText'),
				Icon: LayersIcon,
			},
			{
				label: t('stats.thirdLabel'),
				text: t('stats.thirdText'),
				Icon: ShieldIcon,
			},
		],
		[t],
	)

	return (
		<section className='relative z-[1] grid gap-4 md:grid-cols-3'>
			{metrics.map((metric, index) => (
				<article
					key={index}
					className={`p-6 ${homePanelClass}`}>
					<div className='mb-4 flex items-center gap-3'>
						<span className={iconBadgeClass}>
							<metric.Icon className='h-[20px] w-[20px]' />
						</span>
						<span className='font-bold text-3xl tracking-tight text-foreground'>
							{metric.label}
						</span>
					</div>
					<p className='text-sm text-muted-foreground font-medium'>
						{metric.text}
					</p>
				</article>
			))}
		</section>
	)
}
