'use client'

import { useMemo, useSyncExternalStore } from 'react'

import { defaultLang, getMessage, Lang, normalizeLang } from './i18n'

const storageKey = 'hndb_lang'
const langChangeEvent = 'hndb:lang-change'

function subscribe(onStoreChange: () => void) {
	if (typeof window === 'undefined') return () => {}

	const onChange = () => onStoreChange()
	window.addEventListener('storage', onChange)
	window.addEventListener(langChangeEvent, onChange)

	return () => {
		window.removeEventListener('storage', onChange)
		window.removeEventListener(langChangeEvent, onChange)
	}
}

function getClientSnapshot(): Lang {
	if (typeof window === 'undefined') return defaultLang
	return normalizeLang(window.localStorage.getItem(storageKey))
}

export function useLang() {
	const lang = useSyncExternalStore(
		subscribe,
		getClientSnapshot,
		() => defaultLang,
	)

	const t = useMemo(
		() => (path: string) => getMessage(lang, path),
		[lang],
	)

	const updateLang = (next: Lang) => {
		if (typeof window === 'undefined') return
		window.localStorage.setItem(storageKey, next)
		window.dispatchEvent(new Event(langChangeEvent))
	}

	return { lang, setLang: updateLang, t }
}
