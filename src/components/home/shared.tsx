import { IconComponent } from './types'

type IconProps = { className?: string }

export function WindowsIcon({ className }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='currentColor'
			aria-hidden='true'
			className={className}>
			<path d='M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801' />
		</svg>
	)
}

export function MacIcon({ className }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='currentColor'
			aria-hidden='true'
			className={className}>
			<path d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701' />
		</svg>
	)
}

export function LinuxIcon({ className }: IconProps) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='currentColor'
			aria-hidden='true'
			className={className}>
			<path d='M11.969 0C5.176 0 1.914 4.887 1.914 11.23c0 2.348.652 4.493 1.862 6.425C1.868 18.005 0 19.336 0 21.326c0 1.954 1.765 2.673 3.737 2.673 2.08 0 3.75-1.47 5.753-1.47 1.259 0 2.274.621 2.553.791.221-.137 1.053-.667 2.148-.667 1.848 0 3.324 1.345 5.53 1.345 2.015 0 4.28-.77 4.28-2.673 0-1.92-1.89-3.295-3.805-3.642 1.222-1.932 1.89-4.077 1.89-6.45C22.086 4.888 18.823 0 11.97 0h-.001zm.031 3.208c4.256 0 6.649 3.197 6.649 8.021 0 5.625-3.415 8.164-6.649 8.164-3.235 0-6.65-2.54-6.65-8.164 0-4.824 2.394-8.021 6.65-8.021zM9.98 10.635c0 1.137-.922 2.062-2.058 2.062-1.136 0-2.058-.925-2.058-2.062 0-1.136.922-2.058 2.058-2.058 1.136 0 2.058.922 2.058 2.058zm8.156 0c0 1.137-.921 2.062-2.058 2.062-1.136 0-2.058-.925-2.058-2.062 0-1.136.922-2.058 2.058-2.058 1.137 0 2.058.922 2.058 2.058z' />
		</svg>
	)
}

export const homePanelClass =
	'rounded-3xl border border-border bg-card/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:bg-card/80 hover:border-ring/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'

export const iconBadgeClass =
	'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-sm'

export const primaryButtonClass =
	'inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90 shadow-sm'

export const secondaryButtonClass =
	'inline-flex items-center justify-center rounded-full border border-border bg-secondary/80 backdrop-blur-md px-6 py-2.5 font-medium text-secondary-foreground transition-all hover:bg-secondary hover:border-ring/50'

export const sponsors = [
	'Y Combinator',
	'Sequoia',
	'Andreessen Horowitz',
	'Techstars',
]

export const companies = ['Vercel', 'Supabase', 'Linear', 'Raycast', 'Github']

export const osIcons: Record<string, IconComponent> = {
	windows: WindowsIcon,
	macos: MacIcon,
	linux: LinuxIcon,
}
