'use client'

import { useSyncExternalStore } from 'react'

import { detectPlatform, Platform } from './downloads'

function subscribe(onStoreChange: () => void) {
	if (typeof window === 'undefined') return () => {}

	window.addEventListener('resize', onStoreChange)
	return () => window.removeEventListener('resize', onStoreChange)
}

function getClientSnapshot(): Platform {
	if (typeof navigator === 'undefined') return 'other'
	return detectPlatform(navigator.userAgent)
}

export function usePlatform() {
	return useSyncExternalStore(subscribe, getClientSnapshot, () => 'other')
}
