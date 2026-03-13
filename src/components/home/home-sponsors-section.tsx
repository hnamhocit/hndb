'use client'

import { useLang } from '@/lib/use-lang'

import { sponsors } from './shared'

export function HomeSponsorsSection() {
	const { t } = useLang()

	return (
		<section className='relative z-[1] py-10 md:py-16'>
			<div className='flex flex-col items-center justify-center text-center'>
				<p className='font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] text-muted-foreground/60 uppercase mb-6 md:mb-8'>
					{t('social.sponsors')}
				</p>
				<div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-500'>
					{sponsors.map((name, idx) => (
						<div
							key={idx}
							className='flex items-center gap-2'>
							<div className='h-5 w-5 md:h-6 md:w-6 rounded bg-foreground/80'></div>
							<span className='text-lg md:text-xl font-bold tracking-tight text-foreground/80'>
								{name}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
