'use client'

import { useEffect } from 'react'

import { motion } from 'motion/react'

import { HomeCustomizationSection } from './home-customization-section'
import { HomeCustomersSection } from './home-customers-section'
import { HomeDemoSection } from './home-demo-section'
import { HomeDownloadSection } from './home-download-section'
import { HomeFeaturesSection } from './home-features-section'
import { HomeFooter } from './home-footer'
import { HomeHeroSection } from './home-hero-section'
import { HomeMetricsSection } from './home-metrics-section'
import { HomeReviewsSection } from './home-reviews-section'
import { HomeSponsorsSection } from './home-sponsors-section'

const reveal = {
	initial: { opacity: 0, y: 22 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.2 },
	transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
}

export default function HomePage() {
	useEffect(() => {
		if (typeof window === 'undefined' || !window.location.hash) return

		const id = window.location.hash.replace('#', '')
		if (!id) return

		requestAnimationFrame(() => {
			document.getElementById(id)?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		})
	}, [])

	return (
		<motion.main
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
			className='relative w-full px-4 pb-24 pt-6 md:px-8 xl:px-16 overflow-hidden'>
			<motion.div {...reveal}>
				<HomeHeroSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeSponsorsSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeMetricsSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeFeaturesSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeCustomizationSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeCustomersSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeReviewsSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeDemoSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeDownloadSection />
			</motion.div>
			<motion.div {...reveal}>
				<HomeFooter />
			</motion.div>
		</motion.main>
	)
}
