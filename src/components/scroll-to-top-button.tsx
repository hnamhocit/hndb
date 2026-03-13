'use client'

import { motion } from 'motion/react'
import { ArrowUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			setVisible(window.scrollY > 300)
		}

		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	if (!visible) return null

	return (
		<motion.button
			initial={{ opacity: 0, scale: 0.9, y: 10 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.9, y: 10 }}
			transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
			type='button'
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			aria-label='Scroll to top'
			className='fixed bottom-6 right-6 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary'>
			<ArrowUpIcon className='h-4 w-4' />
		</motion.button>
	)
}
