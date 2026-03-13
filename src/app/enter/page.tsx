'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

import { hasSupabaseEnv, supabaseClient } from '@/lib/supabase-client'
import { useLang } from '@/lib/use-lang'

// Đồng bộ UI class từ trang Home, tinh chỉnh riêng cho Form
const panelClass =
	'rounded-3xl border border-white/10 bg-background/40 backdrop-blur-xl shadow-2xl'
const primaryButtonClass =
	'inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-3 font-medium text-background transition-all hover:scale-[1.02] hover:bg-foreground/90 shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 w-full'
const secondaryButtonClass =
	'inline-flex items-center justify-center rounded-xl border border-border/60 bg-secondary/50 backdrop-blur-md px-5 py-3 font-medium text-secondary-foreground transition-all hover:bg-secondary hover:border-border disabled:cursor-not-allowed disabled:opacity-50 w-full'
const inputClass =
	'h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium outline-none transition-all focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/40'

export default function EnterPage() {
	const { t } = useLang()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [notice, setNotice] = useState('')
	const [sessionEmail, setSessionEmail] = useState<string | null>(null)

	useEffect(() => {
		if (!supabaseClient) return

		supabaseClient.auth.getSession().then(({ data }) => {
			setSessionEmail(data.session?.user?.email ?? null)
		})

		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			setSessionEmail(session?.user?.email ?? null)
		})

		return () => subscription.unsubscribe()
	}, [])

	const signIn = async (event: FormEvent) => {
		event.preventDefault()
		if (!supabaseClient) return

		setLoading(true)
		setNotice('')
		const { error } = await supabaseClient.auth.signInWithPassword({
			email,
			password,
		})
		setLoading(false)
		if (error) {
			setNotice(error.message)
			return
		}
		setNotice('')
	}

	const signUp = async () => {
		if (!supabaseClient) return

		setLoading(true)
		setNotice('')
		const { error } = await supabaseClient.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}/enter`,
			},
		})
		setLoading(false)
		if (error) {
			setNotice(error.message)
			return
		}
		setNotice(t('enter.successSignUp'))
	}

	const signInOAuth = async (provider: 'google' | 'github') => {
		if (!supabaseClient) return
		setLoading(true)
		setNotice('')
		const { error } = await supabaseClient.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/enter`,
			},
		})
		if (error) {
			setLoading(false)
			setNotice(error.message)
		}
	}

	const signOut = async () => {
		if (!supabaseClient) return
		await supabaseClient.auth.signOut()
		setNotice('')
	}

	return (
		<main className='relative min-h-screen w-full px-4 pb-16 pt-8 md:px-8 xl:px-16 overflow-hidden flex flex-col'>
			{/* Background Effects */}
			<div className='pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(rgba(170,186,242,0.1)_1px,transparent_1px)] [background-size:16px_16px]' />
			<div className='pointer-events-none absolute right-0 top-1/4 -z-10 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-primary/10 blur-[120px]' />

			<section
				className={`relative z-[1] mt-12 grid gap-10 p-8 md:p-12 lg:grid-cols-[1.2fr_1fr] flex-1 items-center ${panelClass}`}>
				<div className='flex flex-col justify-center h-full'>
					<div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-6 w-fit'>
						<p className='font-mono text-xs font-bold tracking-widest text-primary uppercase'>
							AUTH / ENTER
						</p>
					</div>

					<h1 className='text-4xl font-extrabold leading-[1.15] md:text-5xl tracking-tight'>
						{t('enter.title')}
					</h1>
					<p className='mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed'>
						{t('enter.description')}
					</p>

					<div className='mt-10 flex flex-wrap items-center gap-4'>
						<Link
							className='inline-flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 transition-all px-6 py-2.5 font-medium'
							href='/#demo'>
							{t('enter.demo')}
						</Link>
						<a
							className='text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors underline-offset-8 hover:underline ml-2'
							href='https://hndb.app/docs'
							target='_blank'
							rel='noreferrer'>
							{t('enter.onboard')}
						</a>
					</div>
				</div>

				<div className='bg-black/20 rounded-2xl p-6 md:p-8 border border-white/5 shadow-inner'>
					{sessionEmail && (
						<div className='mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm'>
							<span className='font-medium text-primary'>
								{t('enter.session')}: <br />
								<span className='text-foreground'>
									{sessionEmail}
								</span>
							</span>
							<button
								type='button'
								className='inline-flex items-center justify-center rounded-lg bg-background/50 border border-white/10 px-4 py-2 font-medium transition-all hover:bg-background'
								onClick={signOut}>
								{t('enter.logout')}
							</button>
						</div>
					)}

					<form
						className='flex flex-col gap-4'
						onSubmit={signIn}>
						<div>
							<label
								htmlFor='email'
								className='mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
								{t('enter.email')}
							</label>
							<input
								id='email'
								type='email'
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
								placeholder='hello@hndb.app'
								required
								className={inputClass}
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
								{t('enter.password')}
							</label>
							<input
								id='password'
								type='password'
								value={password}
								onChange={(event) =>
									setPassword(event.target.value)
								}
								placeholder='••••••••'
								required
								className={inputClass}
							/>
						</div>

						<div className='grid grid-cols-2 gap-3 mt-4'>
							<button
								className={primaryButtonClass}
								type='submit'
								disabled={loading || !hasSupabaseEnv}>
								{t('enter.signIn')}
							</button>
							<button
								className={secondaryButtonClass}
								type='button'
								disabled={loading || !hasSupabaseEnv}
								onClick={signUp}>
								{t('enter.signUp')}
							</button>
						</div>
					</form>

					<div className='relative mt-8 mb-6'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-white/10'></div>
						</div>
						<div className='relative flex justify-center text-xs'>
							<span className='bg-background/80 px-2 text-muted-foreground uppercase tracking-wider backdrop-blur-sm'>
								{t('enter.or')}
							</span>
						</div>
					</div>

					<div className='grid gap-3 sm:grid-cols-2'>
						<button
							type='button'
							onClick={() => signInOAuth('google')}
							disabled={loading || !hasSupabaseEnv}
							className='inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium transition-all hover:bg-white/10 hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50'>
							<Image
								src='/providers/google.svg'
								alt='Google'
								width={18}
								height={18}
							/>
							<span>Google</span>
						</button>
						<button
							type='button'
							onClick={() => signInOAuth('github')}
							disabled={loading || !hasSupabaseEnv}
							className='inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium transition-all hover:bg-white/10 hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50'>
							<Image
								src='/providers/github.png'
								alt='GitHub'
								width={18}
								height={18}
								className='brightness-0 dark:invert opacity-80'
							/>
							<span>GitHub</span>
						</button>
					</div>

					{!hasSupabaseEnv && (
						<div className='mt-6 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-center text-sm text-red-400'>
							{t('enter.envMissing')}
						</div>
					)}
					{notice && (
						<div className='mt-6 p-3 rounded-lg border border-primary/20 bg-primary/10 text-center text-sm text-primary'>
							{notice}
						</div>
					)}
				</div>
			</section>
		</main>
	)
}
