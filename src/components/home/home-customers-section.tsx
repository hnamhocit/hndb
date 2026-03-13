'use client'

import { useLang } from '@/lib/use-lang'

import { companies } from './shared'

export function HomeCustomersSection() {
	const { t } = useLang()

	return (
		<section className='relative z-[1] py-12 md:py-16 mt-8 border-y border-border'>
			<div className='max-w-4xl mx-auto text-center px-4'>
				<p className='text-sm font-medium text-muted-foreground mb-6 md:mb-8'>
					{t('social.customers')}
				</p>
				<div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12 md:gap-y-6 text-muted-foreground/50'>
					{companies.map((company, index) => (
						<span
							key={index}
							className='text-xl md:text-3xl font-extrabold hover:text-foreground transition-all duration-300 cursor-default'>
							{company}
						</span>
					))}
				</div>
			</div>
		</section>
	)
}
