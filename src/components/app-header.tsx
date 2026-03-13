'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent, useEffect, useMemo, useState } from 'react'

import { ThemeToggle } from '@/components/theme-toggle'
import { useLang } from '@/lib/use-lang'

interface NavItem {
	key:
		| 'features'
		| 'customization'
		| 'demo'
		| 'download'
		| 'blog'
		| 'enter'
	href: string
	mode: 'hash' | 'path'
}

const navItems: NavItem[] = [
	{ key: 'features', href: '/#features', mode: 'hash' },
	{ key: 'customization', href: '/#customization', mode: 'hash' },
	{ key: 'demo', href: '/#demo', mode: 'hash' },
	{ key: 'download', href: '/#download', mode: 'hash' },
	{ key: 'blog', href: '/blog', mode: 'path' },
	{ key: 'enter', href: '/enter', mode: 'path' },
]

function LangSwitcher({
	lang,
	setLang,
}: {
	lang: 'vi' | 'en'
	setLang: (lang: 'vi' | 'en') => void
}) {
	return (
		<div
			role='group'
			aria-label='Language switch'
			className='inline-flex rounded-full border border-border bg-muted/50 p-1 font-semibold text-xs'>
			<button
				type='button'
				onClick={() => setLang('vi')}
				className={`h-7 min-w-9 rounded-full px-2 md:px-3 transition-all ${lang === 'vi' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
				VI
			</button>
			<button
				type='button'
				onClick={() => setLang('en')}
				className={`h-7 min-w-9 rounded-full px-2 md:px-3 transition-all ${lang === 'en' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
				EN
			</button>
		</div>
	)
}

export function AppHeader() {
	const pathname = usePathname()
	const { lang, setLang, t } = useLang()
	const [hash, setHash] = useState('')

	useEffect(() => {
		const updateHash = () => {
			setHash(window.location.hash)
		}

		updateHash()
		window.addEventListener('hashchange', updateHash)
		return () => window.removeEventListener('hashchange', updateHash)
	}, [pathname])

	const activeMap = useMemo(() => {
		const map = new Map<NavItem['key'], boolean>()

		for (const item of navItems) {
			if (item.mode === 'path') {
				const active =
					pathname === item.href ||
					pathname.startsWith(`${item.href}/`)
				map.set(item.key, active)
				continue
			}

			const targetHash = item.href.replace('/#', '#')
			const active =
				pathname === '/' &&
				(hash === targetHash || (hash === '' && item.key === 'features'))
			map.set(item.key, active)
		}

		return map
	}, [hash, pathname])

	const handleNavClick = (
		event: MouseEvent<HTMLAnchorElement>,
		item: NavItem,
	) => {
		if (item.mode !== 'hash' || pathname !== '/') return

		event.preventDefault()

		const id = item.href.split('#')[1]
		if (!id) return

		const target = document.getElementById(id)
		if (!target) {
			window.location.assign(item.href)
			return
		}

		target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		window.history.replaceState(null, '', `/#${id}`)
		setHash(`#${id}`)
	}

	return (
		<div className='px-4 pt-6 md:px-8 xl:px-16'>
			<header className='sticky top-4 z-50 flex flex-col md:flex-row items-center justify-between gap-4 rounded-[2rem] md:rounded-full border border-border bg-background/70 px-5 py-3 backdrop-blur-xl shadow-sm transition-all'>
				<div className='flex w-full md:w-auto items-center justify-between'>
					<Link
						className='inline-flex items-center gap-3 font-bold tracking-wider'
						href='/'>
						<Image
							src='/logo.png'
							alt='HNDB'
							width={24}
							height={24}
							className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg'
						/>
						<span className='text-foreground'>{t('brand')}</span>
					</Link>
					<div className='flex md:hidden items-center gap-2'>
						<ThemeToggle />
						<LangSwitcher
							lang={lang}
							setLang={setLang}
						/>
					</div>
				</div>

				<nav className='flex w-full overflow-x-auto pb-1 md:pb-0 md:w-auto md:flex-wrap gap-x-6 gap-y-2 text-sm font-medium whitespace-nowrap scrollbar-hide'>
					{navItems.map((item) => {
						const active = activeMap.get(item.key) || false
						return (
								<Link
									key={item.key}
									href={item.href}
									onClick={(event) =>
										handleNavClick(event, item)
									}
									aria-current={active ? 'page' : undefined}
									className={`transition-colors ${active ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
								{t(`nav.${item.key}`)}
							</Link>
						)
					})}
				</nav>

				<div className='hidden md:flex items-center gap-3'>
					<ThemeToggle />
					<LangSwitcher
						lang={lang}
						setLang={setLang}
					/>
				</div>
			</header>
		</div>
	)
}
