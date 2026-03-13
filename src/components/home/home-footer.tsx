'use client'

import Image from 'next/image'

import { useLang } from '@/lib/use-lang'

export function HomeFooter() {
	const { t } = useLang()

	return (
		<>
			<footer className='relative z-[1] mt-16 flex flex-col md:flex-row justify-between gap-10 border-t border-border pt-10 text-sm text-muted-foreground'>
				<div className='max-w-xs text-center md:text-left mx-auto md:mx-0'>
					<div className='flex items-center justify-center md:justify-start gap-2 mb-4'>
						<Image
							src='/logo.png'
							alt='HNDB'
							width={24}
							height={24}
							className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg'
						/>
						<strong className='text-foreground text-base tracking-widest'>
							HNDB
						</strong>
					</div>
					<p>{t('footer.tagline')}</p>
				</div>

				<div className='flex flex-wrap justify-center md:justify-end gap-10 md:gap-16 text-center md:text-left'>
					<div className='flex flex-col gap-3'>
						<h4 className='text-foreground font-semibold mb-2'>
							Sản phẩm
						</h4>
						<a
							href='#features'
							className='hover:text-foreground transition-colors'>
							{t('nav.features')}
						</a>
						<a
							href='#customization'
							className='hover:text-foreground transition-colors'>
							{t('nav.customization')}
						</a>
						<a
							href='#download'
							className='hover:text-foreground transition-colors'>
							{t('nav.download')}
						</a>
					</div>
					<div className='flex flex-col gap-3'>
						<h4 className='text-foreground font-semibold mb-2'>
							Tài nguyên
						</h4>
						<a
							href='mailto:support@hndb.app'
							className='hover:text-foreground transition-colors'>
							{t('footer.help')}
						</a>
						<a
							href='mailto:hello@hndb.app'
							className='hover:text-foreground transition-colors'>
							{t('footer.contact')}
						</a>
						<a
							href='https://hndb.app/privacy'
							className='hover:text-foreground transition-colors'>
							{t('footer.legal')}
						</a>
					</div>
				</div>
			</footer>
			<div className='mt-10 text-center text-xs text-muted-foreground/50 pb-6 relative z-[1]'>
				© {new Date().getFullYear()} HNDB. {t('footer.rights')}
			</div>
		</>
	)
}
