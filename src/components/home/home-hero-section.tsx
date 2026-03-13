'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import { downloadLinks } from '@/lib/downloads'
import { useLang } from '@/lib/use-lang'
import { usePlatform } from '@/lib/use-platform'
import { BoltIcon, LayersIcon, ShieldIcon } from 'lucide-react'

import { osIcons, primaryButtonClass } from './shared'
import { DownloadItem } from './types'

export function HomeHeroSection() {
	const { t } = useLang()
	const platform = usePlatform()

	const osLinks = useMemo<DownloadItem[]>(
		() => [
			{
				key: 'windows',
				label: t('download.windows'),
				note: t('download.windowsNote'),
				href: downloadLinks.windows,
				recommended: platform === 'windows',
				Icon: osIcons.windows,
			},
			{
				key: 'macos',
				label: t('download.macos'),
				note: t('download.macosNote'),
				href: downloadLinks.macos,
				recommended: platform === 'macos',
				Icon: osIcons.macos,
			},
			{
				key: 'linux',
				label: t('download.linux'),
				note: t('download.linuxNote'),
				href: downloadLinks.linux,
				recommended: platform === 'linux',
				Icon: osIcons.linux,
			},
		],
		[platform, t],
	)

	const preferred = osLinks.find((item) => item.recommended)
	const primaryDownload = {
		label: preferred?.label ?? t('download.autoFallback'),
		href: preferred?.href ?? downloadLinks.latest,
	}

	return (
		<section className='relative z-[1] mt-8 md:mt-10 grid gap-6 md:p-12 lg:grid-cols-[1.4fr_1fr] rounded-3xl'>
			<div className='flex flex-col justify-center text-center md:text-left items-center md:items-start'>
				<div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 mb-6'>
					<span className='flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse'></span>
					<p className='font-mono text-xs font-semibold tracking-widest text-primary'>
						{t('hero.badge')}
					</p>
				</div>

				<h1 className='max-w-4xl text-4xl font-extrabold leading-[1.15] md:text-6xl tracking-tight text-foreground'>
					{t('hero.title')}
				</h1>
				<p className='mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed'>
					{t('hero.description')}
				</p>

				<div className='mt-8 flex flex-col sm:flex-row items-center gap-4'>
					<a
						className={`${primaryButtonClass} w-full sm:w-auto`}
						href={primaryDownload.href}
						target='_blank'
						rel='noreferrer'>
						<BoltIcon className='w-5 h-5 mr-2' />
						{primaryDownload.label}
					</a>
					<a
						className='text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors underline-offset-8 hover:underline'
						href='#demo'>
						{t('hero.noLoginDemo')}
					</a>
				</div>
				<p className='mt-4 text-xs text-muted-foreground/80 flex items-center'>
					<ShieldIcon className='w-4 h-4 mr-1 opacity-50' />
					{t('download.autoCta')}
				</p>
			</div>

			<aside className='flex flex-col justify-center rounded-3xl border border-border/80 bg-background/50 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-xl mt-8 md:mt-0 transition-all hover:border-border hover:bg-background/80'>
				<div className='inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 shadow-sm mb-5'>
					<LayersIcon className='w-6 h-6 text-primary' />
				</div>

				<h3 className='text-xl font-bold tracking-tight text-foreground'>
					{t('authCard.title')}
				</h3>

				<p className='mt-2.5 text-sm text-muted-foreground leading-relaxed'>
					{t('authCard.description')}
				</p>

				<div className='mt-8 flex flex-col gap-3'>
					<Link
						href='/enter'
						className='inline-flex h-11 items-center justify-center rounded-xl bg-foreground px-6 font-medium text-background transition-all hover:scale-[1.02] hover:bg-foreground/90 shadow-sm'>
						{t('authCard.enter')}
					</Link>
				</div>
			</aside>
		</section>
	)
}
