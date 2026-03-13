'use client'

import { useMemo } from 'react'

import { useLang } from '@/lib/use-lang'

import { homePanelClass } from './shared'

export function HomeReviewsSection() {
	const { t } = useLang()

	const reviews = useMemo(
		() => [
			{
				text: t('social.review1Text'),
				name: t('social.review1Name'),
				title: t('social.review1Title'),
				avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4',
			},
			{
				text: t('social.review2Text'),
				name: t('social.review2Name'),
				title: t('social.review2Title'),
				avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Brian&backgroundColor=c0aede',
			},
			{
				text: t('social.review3Text'),
				name: t('social.review3Name'),
				title: t('social.review3Title'),
				avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Chris&backgroundColor=ffd5dc',
			},
		],
		[t],
	)

	return (
		<section
			className={`relative z-[1] mt-8 md:mt-12 p-6 md:p-12 ${homePanelClass}`}>
			<div className='text-center max-w-2xl mx-auto mb-10 md:mb-12'>
				<p className='font-mono text-xs font-bold tracking-widest text-primary mb-3 uppercase'>
					{t('social.reviewsBadge')}
				</p>
				<h2 className='text-3xl md:text-4xl font-extrabold tracking-tight text-foreground'>
					{t('social.reviewsTitle')}
				</h2>
				<p className='mt-4 text-muted-foreground text-base md:text-lg'>
					{t('social.reviewsDescription')}
				</p>
			</div>

			<div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
				{reviews.map((review, index) => (
					<article
						key={index}
						className='flex flex-col justify-between rounded-2xl border border-border bg-card/40 p-6 hover:border-ring/30 shadow-sm transition-all relative overflow-hidden'>
						<div className='absolute top-2 right-4 text-6xl text-primary/10 font-serif leading-none'>
							&ldquo;
						</div>
						<p className='text-muted-foreground leading-relaxed text-sm z-10 relative mb-6'>
							{review.text}
						</p>
						<div className='flex items-center gap-4 mt-auto z-10'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={review.avatar}
								alt={review.name}
								className='w-10 h-10 rounded-full border border-border bg-muted'
							/>
							<div>
								<h4 className='text-sm font-bold text-foreground'>
									{review.name}
								</h4>
								<p className='text-xs text-muted-foreground font-mono mt-0.5'>
									{review.title}
								</p>
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
