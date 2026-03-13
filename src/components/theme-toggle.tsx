'use client'

import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '@/lib/use-theme'

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme()
	const isDark = theme === 'dark'

	return (
		<button
			type='button'
			onClick={toggleTheme}
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			className='inline-flex h-9 items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-3 text-xs font-semibold text-secondary-foreground transition-all hover:bg-secondary'>
			{isDark ?
				<>
					<SunIcon className='h-4 w-4' />
					<span>Light</span>
				</>
			:	<>
					<MoonIcon className='h-4 w-4' />
					<span>Dark</span>
				</>
			}
		</button>
	)
}
