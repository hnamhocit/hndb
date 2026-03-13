export type Platform = 'windows' | 'macos' | 'linux' | 'other'

const githubLatest = 'https://github.com/hnamhocit/hndb-web/releases/latest'

export const downloadLinks = {
	windows:
		process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_URL ||
		'https://github.com/hnamhocit/hndb-web/releases/latest',
	macos:
		process.env.NEXT_PUBLIC_DOWNLOAD_MACOS_URL ||
		'https://github.com/hnamhocit/hndb-web/releases/latest',
	linux:
		process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_URL ||
		'https://github.com/hnamhocit/hndb-web/releases/latest',
	latest: process.env.NEXT_PUBLIC_DOWNLOAD_LATEST_URL || githubLatest,
}

export function detectPlatform(userAgent: string): Platform {
	const ua = userAgent.toLowerCase()

	if (ua.includes('win')) return 'windows'
	if (ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad')) {
		return 'macos'
	}
	if (ua.includes('linux') || ua.includes('x11')) return 'linux'
	return 'other'
}
