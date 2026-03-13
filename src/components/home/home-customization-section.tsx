'use client'

import { useMemo } from 'react'

import { useLang } from '@/lib/use-lang'
import { BoxIcon, CodeIcon, FactoryIcon, TruckIcon } from 'lucide-react'

import { homePanelClass } from './shared'

export function HomeCustomizationSection() {
	const { t } = useLang()

	const customizationItems = useMemo(
		() => [
			{
				title: t('customization.item1Title'),
				text: t('customization.item1Text'),
				Icon: CodeIcon,
			},
			{
				title: t('customization.item2Title'),
				text: t('customization.item2Text'),
				Icon: BoxIcon,
			},
			{
				title: t('customization.item3Title'),
				text: t('customization.item3Text'),
				Icon: FactoryIcon,
			},
			{
				title: t('customization.item4Title'),
				text: t('customization.item4Text'),
				Icon: TruckIcon,
			},
		],
		[t],
	)

	return (
		<section
			id='customization'
			className={`relative z-[1] mt-8 md:mt-12 p-6 md:p-12 ${homePanelClass} scroll-mt-28 md:scroll-mt-32`}>
			<div className='max-w-2xl text-center md:text-left mx-auto md:mx-0'>
				<p className='font-mono text-xs font-bold tracking-widest text-primary mb-3 uppercase'>
					{t('customization.badge')}
				</p>
				<h2 className='text-3xl md:text-4xl font-extrabold tracking-tight text-foreground'>
					{t('customization.title')}
				</h2>
				<p className='mt-4 text-base md:text-lg text-muted-foreground'>
					{t('customization.description')}
				</p>
			</div>

			<div className='mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{customizationItems.map((item, index) => (
					<article
						key={index}
						className='rounded-2xl border border-border bg-background/50 p-6 hover:bg-background/80 transition-colors'>
						<item.Icon className='h-7 w-7 text-primary mb-4' />
						<h3 className='text-lg font-bold mb-2 text-foreground'>
							{item.title}
						</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							{item.text}
						</p>
					</article>
				))}
			</div>
		</section>
	)
}
