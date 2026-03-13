'use client'

import { useMemo } from 'react'

import { useLang } from '@/lib/use-lang'
import { BriefcaseIcon, LayersIcon, ShieldIcon } from 'lucide-react'

import { iconBadgeClass, homePanelClass } from './shared'

export function HomeFeaturesSection() {
	const { t } = useLang()

	const features = useMemo(
		() => [
			{
				title: t('features.title1'),
				text: t('features.text1'),
				Icon: BriefcaseIcon,
			},
			{
				title: t('features.title2'),
				text: t('features.text2'),
				Icon: LayersIcon,
			},
			{
				title: t('features.title3'),
				text: t('features.text3'),
				Icon: ShieldIcon,
			},
		],
		[t],
	)

	return (
		<section
			id='features'
			className='relative z-[1] mt-8 md:mt-12 grid gap-4 md:grid-cols-3 scroll-mt-28 md:scroll-mt-32'>
			{features.map((feature, index) => (
				<article
					key={index}
					className={`p-6 md:p-8 ${homePanelClass}`}>
					<div className='mb-6'>
						<span className={iconBadgeClass}>
							<feature.Icon className='h-[20px] w-[20px]' />
						</span>
					</div>
					<h2 className='text-lg md:text-xl font-bold mb-3 text-foreground'>
						{feature.title}
					</h2>
					<p className='text-muted-foreground leading-relaxed text-sm'>
						{feature.text}
					</p>
				</article>
			))}
		</section>
	)
}
