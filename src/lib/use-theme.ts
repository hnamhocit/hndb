'use client'

import { useEffect, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const storageKey = 'hndb_theme'
const themeChangeEvent = 'hndb:theme-change'
const defaultTheme: Theme = 'light'

function normalizeTheme(value: string | null | undefined): Theme {
	return value === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
	if (typeof document === 'undefined') return
	const root = document.documentElement
	root.classList.toggle('dark', theme === 'dark')
	root.style.colorScheme = theme
}

function subscribe(onStoreChange: () => void) {
	if (typeof window === 'undefined') return () => {}

	const onChange = () => onStoreChange()
	window.addEventListener('storage', onChange)
	window.addEventListener(themeChangeEvent, onChange)

	return () => {
		window.removeEventListener('storage', onChange)
		window.removeEventListener(themeChangeEvent, onChange)
	}
}

function getClientSnapshot(): Theme {
	if (typeof window === 'undefined') return defaultTheme
	return normalizeTheme(window.localStorage.getItem(storageKey))
}

export function useTheme() {
	const theme = useSyncExternalStore(
		subscribe,
		getClientSnapshot,
		() => defaultTheme,
	)

	useEffect(() => {
		applyTheme(theme)
	}, [theme])

	const setTheme = (next: Theme) => {
		if (typeof window === 'undefined') return
		window.localStorage.setItem(storageKey, next)
		applyTheme(next)
		window.dispatchEvent(new Event(themeChangeEvent))
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return { theme, setTheme, toggleTheme }
}
