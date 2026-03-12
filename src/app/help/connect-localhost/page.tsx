import type { Metadata } from 'next'
import {
	ArrowLeftIcon,
	ExternalLinkIcon,
	InfoIcon,
} from 'lucide-react'
import Link from 'next/link'

interface ConnectLocalhostPageProps {
	searchParams: Promise<{
		source?: string
		name?: string
	}>
}

const SOURCE_PORT_CONFIG: Record<
	string,
	{ port: number | null; label: string }
> = {
	postgresql: { port: 5432, label: 'PostgreSQL' },
	mysql: { port: 3306, label: 'MySQL' },
	'maria-db': { port: 3306, label: 'MariaDB' },
	'sql-server': { port: 1433, label: 'SQL Server' },
	mongodb: { port: 27017, label: 'MongoDB' },
	redis: { port: 6379, label: 'Redis' },
	sqlite: { port: null, label: 'SQLite' },
}

export const metadata: Metadata = {
	title: 'Connect Localhost with localtunnel',
	description:
		'Guide for connecting local databases to HNDB using localtunnel.',
	alternates: {
		canonical: '/help/connect-localhost',
	},
	openGraph: {
		title: 'Connect Localhost with localtunnel | HNDB',
		description:
			'Step-by-step guide for exposing localhost database with localtunnel and connecting it to HNDB.',
		url: '/help/connect-localhost',
		type: 'article',
	},
}

export default async function ConnectLocalhostPage({
	searchParams,
}: ConnectLocalhostPageProps) {
	const params = await searchParams
	const sourceKey = (params.source || '').toLowerCase()
	const sourcePortConfig = SOURCE_PORT_CONFIG[sourceKey]
	const sourceName = sourcePortConfig?.label || params.name || 'your database'
	const sourcePort = sourcePortConfig?.port

	return (
		<div className='h-full overflow-auto p-4 md:p-6 lg:p-8'>
			<div className='mx-auto max-w-4xl space-y-4'>
				<Link
					href='/'
					className='inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors'>
					<ArrowLeftIcon size={14} />
					Back
				</Link>

				<div className='rounded-xl border bg-card p-5 md:p-6'>
					<p className='text-xs uppercase tracking-widest text-primary font-semibold'>
						Localhost Guide
					</p>
					<h1 className='mt-2 text-2xl md:text-3xl font-bold tracking-tight'>
						How to connect localhost using localtunnel
					</h1>
					<p className='mt-2 text-sm text-muted-foreground'>
						Quick setup for {sourceName} from your local machine to
						HNDB.
					</p>
				</div>

				<div className='rounded-xl border p-5 md:p-6 space-y-4'>
					<div className='text-base font-semibold'>
						1. Download the setup script
					</div>
					<div className='flex flex-col sm:flex-row gap-3'>
						<a
							href='/resources/setup.sh'
							download='setup.sh'
							className='inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent transition-colors'>
							Download setup.sh (macOS/Linux)
						</a>
						<a
							href='/resources/setup.bat'
							download='setup.bat'
							className='inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent transition-colors'>
							Download setup.bat (Windows)
						</a>
					</div>
					<p className='text-sm text-muted-foreground'>
						These scripts scan common DB ports, install
						<code>localtunnel</code> if needed, then open a tunnel
						for the selected port.
					</p>

					<div className='text-base font-semibold'>
						2. Run the script
					</div>
					<div className='space-y-3'>
						<div className='text-sm font-medium'>macOS / Linux</div>
						<div className='rounded-lg border bg-black text-slate-100 p-4 text-sm font-mono overflow-auto'>
							<div>$ chmod +x ./setup.sh</div>
							<div>$ ./setup.sh</div>
						</div>
						<div className='text-sm font-medium'>Windows</div>
						<div className='rounded-lg border bg-black text-slate-100 p-4 text-sm font-mono overflow-auto'>
							<div>{'>'} setup.bat</div>
						</div>
					</div>
					<p className='text-sm text-muted-foreground'>
						When asked, choose your DB port.
						{sourcePort ?
							` ${sourceName} usually uses port ${sourcePort}.`
						:	' If your DB is not listed, choose Custom port.'}
					</p>

					<div className='text-base font-semibold'>
						3. Copy tunnel host from terminal output
					</div>
					<div className='rounded-lg border bg-black text-slate-100 p-4 text-sm font-mono overflow-auto'>
						<div>$ lt --port {sourcePort ?? '<port>'}</div>
						<div>your url is: https://random-name.loca.lt</div>
					</div>
					<p className='text-sm text-muted-foreground'>
						Use the generated host in your HNDB data source config,
						and keep this terminal window open while connecting.
					</p>

					<div className='text-base font-semibold'>
						4. Configure your data source in HNDB
					</div>
					<ul className='space-y-2 text-sm text-muted-foreground list-disc pl-5'>
						<li>Open Add Data Source and choose your database.</li>
						<li>Set host to your `*.loca.lt` tunnel hostname.</li>
						<li>Set port to the port requested by your tunnel.</li>
						<li>Use your existing local DB username/password.</li>
					</ul>
					<p className='text-xs text-muted-foreground'>
						If your connection fails, rerun the script and verify the
						database service is running before testing again.
					</p>
				</div>

				<div className='rounded-xl border p-5 md:p-6 space-y-3'>
					<div className='inline-flex items-center gap-2 text-base font-semibold'>
						<InfoIcon size={16} />
						Why direct localhost connection fails
					</div>
					<p className='text-sm text-muted-foreground'>
						If HNDB/API is running on a VPS, then{' '}
						<code>localhost</code>
						means the VPS itself, not your laptop. So when you enter
						`localhost:{sourcePort ?? '<port>'}`, the VPS tries to
						find that DB on its own machine and fails.
					</p>
					<ul className='space-y-2 text-sm text-muted-foreground list-disc pl-5'>
						<li>
							Your local DB is usually bound to `127.0.0.1` on
							your computer only.
						</li>
						<li>
							Home/office networks are behind NAT and firewall, so
							VPS cannot dial in directly.
						</li>
						<li>
							localtunnel creates a public tunnel endpoint, then
							forwards traffic back to your local machine.
						</li>
					</ul>
				</div>

				<div className='rounded-xl border p-4 text-sm flex flex-wrap items-center justify-between gap-3'>
					<div>
						Want to support this project? Add your donation info on
						the dedicated page.
					</div>
					<Link
						href='/donate'
						className='inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-medium hover:bg-accent transition-colors'>
						Open donate page
						<ExternalLinkIcon size={14} />
					</Link>
				</div>
			</div>
		</div>
	)
}
