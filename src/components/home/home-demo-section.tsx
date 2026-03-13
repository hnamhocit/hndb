'use client'

import Image from 'next/image'

import { useLang } from '@/lib/use-lang'

import { homePanelClass } from './shared'

export function HomeDemoSection() {
	const { t } = useLang()

	return (
		<section
			id='demo'
			className={`relative z-[1] mt-8 md:mt-12 p-6 md:p-12 ${homePanelClass} scroll-mt-28 md:scroll-mt-32`}>
			<div className='text-center max-w-2xl mx-auto mb-10'>
				<p className='font-mono text-xs font-bold tracking-widest text-primary mb-3 uppercase'>
					{t('demo.badge')}
				</p>
				<h2 className='text-3xl md:text-4xl font-extrabold tracking-tight text-foreground'>
					{t('demo.title')}
				</h2>
				<p className='mt-4 text-muted-foreground text-base md:text-lg'>
					{t('demo.description')}
				</p>
			</div>
			<div className='grid gap-6 md:gap-4 md:grid-cols-2'>
				<div className='overflow-hidden rounded-2xl border border-border shadow-xl'>
					<Image
						src='/resources/qr-1.jpeg'
						alt='HNDB Interface App'
						width={800}
						height={500}
						className='w-full object-cover hover:scale-105 transition-transform duration-700'
					/>
				</div>
				<div className='overflow-hidden rounded-2xl border border-border shadow-xl'>
					<Image
						src='/resources/qr-2.jpeg'
						alt='HNDB Settings Panel'
						width={800}
						height={500}
						className='w-full object-cover hover:scale-105 transition-transform duration-700'
					/>
				</div>
			</div>
		</section>
	)
}
