'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Calendar, ChevronRight, Clock } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface BlogPost {
	id: number
	category: string
	title: string
	excerpt: string
	date: string
	readTime: string
	author: string
	content: ReactNode
}

const mockPosts: BlogPost[] = [
	{
		id: 1,
		category: 'Release',
		title: 'HNDB 2.0: Định nghĩa lại trải nghiệm SQL Client',
		excerpt:
			'Bản cập nhật lớn nhất từ trước đến nay với giao diện hoàn toàn mới, tối ưu hóa hiệu năng render dữ liệu và hàng loạt tính năng tùy biến sâu cho Developer.',
		date: '13 Th03, 2026',
		readTime: '5 min read',
		author: 'HNDB Team',
		content: (
			<>
				<p>
					Hôm nay, chúng tôi vô cùng hào hứng giới thiệu{' '}
					<strong>HNDB 2.0</strong>. Sau nhiều tháng lắng nghe phản
					hồi từ cộng đồng, chúng tôi đã đập đi xây lại toàn bộ engine
					render Data Grid để mang lại tốc độ phản hồi dưới 50ms, ngay
					cả khi bạn truy vấn hàng triệu dòng dữ liệu.
				</p>
				<h3>Có gì mới trong bản 2.0?</h3>
				<p>
					Bản cập nhật này không chỉ thay đổi về mặt giao diện (UI) mà
					còn tối ưu sâu bên trong lõi (Core Engine):
				</p>
				<ul>
					<li>
						<strong>Giao diện Glassmorphism mới:</strong> Sạch sẽ
						hơn, tập trung 100% vào SQL Editor.
					</li>
					<li>
						<strong>Zero-latency Grid:</strong> Cuộn mượt mà không
						bị giật lag với bộ nhớ tối ưu.
					</li>
					<li>
						<strong>Theme Builder:</strong> Tự do tinh chỉnh màu sắc
						syntax theo ý thích cá nhân.
					</li>
				</ul>
				<blockquote>
					&ldquo;Mục tiêu của chúng tôi không phải là tạo ra một công cụ
					nhồi nhét mọi tính năng, mà là tạo ra một công cụ mà
					developer cảm thấy &lsquo;đã&rsquo; nhất khi gõ code.&rdquo;
				</blockquote>
				<p>
					Bản cập nhật hiện đã có sẵn cho toàn bộ người dùng Windows,
					macOS và Linux. Hãy tải về và trải nghiệm ngay!
				</p>
			</>
		),
	},
	{
		id: 2,
		category: 'Engineering',
		title: 'Làm thế nào chúng tôi giảm 80% RAM usage cho Electron app?',
		excerpt:
			'Một bài viết chuyên sâu về kỹ thuật phân bổ bộ nhớ, dọn dẹp garbage collection và lý do chúng tôi chuyển một phần core sang Rust.',
		date: '05 Th03, 2026',
		readTime: '12 min read',
		author: 'Alex Nguyen',
		content: (
			<>
				<p>
					Các ứng dụng Desktop dựa trên công nghệ Web thường bị gắn
					mác là &ldquo;kẻ ngốn RAM&rdquo;. Trong những ngày đầu phát
					triển, HNDB cũng không ngoại lệ. Tuy nhiên, mọi thứ đã thay
					đổi.
				</p>
				<p>
					Trong bài viết này, chúng tôi sẽ chia sẻ hành trình tối ưu
					hóa bộ nhớ, từ việc profiling các node dư thừa trên DOM cho
					đến việc viết lại các module xử lý data nặng bằng{' '}
					<strong>Rust (WebAssembly)</strong>.
				</p>
			</>
		),
	},
	{
		id: 3,
		category: 'Tutorial',
		title: 'Hướng dẫn thiết lập SSH Tunnel an toàn trong HNDB',
		excerpt:
			'Bảo vệ cơ sở dữ liệu production của bạn bằng cách định tuyến các truy vấn qua một máy chủ Jump Host an toàn chỉ với 3 bước.',
		date: '28 Th02, 2026',
		readTime: '3 min read',
		author: 'Security Team',
		content: (
			<>
				<p>
					Bảo mật luôn là ưu tiên hàng đầu khi kết nối đến các
					Database Production. Tính năng SSH Tunnel tích hợp sẵn trong
					HNDB giúp bạn làm điều này một cách dễ dàng.
				</p>
				<p>
					Chỉ cần vào phần Settings &gt; Connection, chọn tab SSH và
					nhập thông tin Private Key của bạn. HNDB sẽ tự động lo phần
					còn lại.
				</p>
			</>
		),
	},
]

const viewMotion = {
	initial: { opacity: 0, y: 18 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -12 },
	transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
}

export default function BlogPage() {
	const [activePost, setActivePost] = useState<BlogPost | null>(null)

	return (
		<motion.main
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
			className='relative min-h-screen w-full px-4 pb-24 pt-8 md:px-8 xl:px-16 overflow-hidden'>
			<div className='pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-30 [background-image:radial-gradient(var(--tw-gradient-stops))] from-primary/5 to-transparent bg-[length:16px_16px] [background-image:radial-gradient(rgba(170,186,242,0.3)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(170,186,242,0.1)_1px,transparent_1px)]' />

			<AnimatePresence mode='wait'>
				{!activePost && (
					<motion.div
						key='blog-list'
						{...viewMotion}
						className='relative z-10 max-w-5xl mx-auto mt-12'>
						<div className='mb-16'>
							<p className='font-mono text-xs font-bold tracking-widest text-primary mb-3 uppercase'>
								Changelog & Blog
							</p>
							<h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
								Cập nhật mới nhất
							</h1>
							<p className='mt-4 text-lg text-muted-foreground max-w-2xl'>
								Những tính năng mới nhất, cải tiến hiệu năng và các
								bài viết kỹ thuật từ đội ngũ phát triển HNDB.
							</p>
						</div>

						<div className='grid gap-8 md:grid-cols-2'>
							{mockPosts.map((post, index) => (
								<motion.article
									key={post.id}
									initial={{ opacity: 0, y: 18 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.35,
										delay: index * 0.06,
										ease: [0.22, 1, 0.36, 1],
									}}
									whileHover={{ y: -4 }}
									className='group flex flex-col items-start justify-between rounded-3xl border border-border bg-card/40 p-8 transition-all hover:bg-card/80 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] cursor-pointer'
									onClick={() => {
										setActivePost(post)
										window.scrollTo({
											top: 0,
											behavior: 'smooth',
										})
									}}>
									<div className='w-full'>
										<div className='flex items-center gap-3 mb-5'>
											<span className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
												{post.category}
											</span>
											<span className='text-xs text-muted-foreground flex items-center gap-1.5 font-mono'>
												<Calendar className='w-3.5 h-3.5' />
												{post.date}
											</span>
										</div>
										<h2 className='text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-3'>
											{post.title}
										</h2>
										<p className='text-muted-foreground leading-relaxed text-sm line-clamp-3'>
											{post.excerpt}
										</p>
									</div>

									<div className='mt-8 flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors'>
										Đọc tiếp
										<ChevronRight className='w-4 h-4 ml-1 transition-transform group-hover:translate-x-1' />
									</div>
								</motion.article>
							))}
						</div>
					</motion.div>
				)}

				{activePost && (
					<motion.div
						key={`blog-detail-${activePost.id}`}
						{...viewMotion}
						className='relative z-10 max-w-3xl mx-auto mt-8'>
						<motion.button
							whileHover={{ x: -2 }}
							onClick={() => setActivePost(null)}
							className='group mb-12 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
							<ArrowLeft className='w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1' />
							Quay lại danh sách
						</motion.button>

						<header className='mb-14'>
							<span className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6'>
								{activePost.category}
							</span>
							<h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6'>
								{activePost.title}
							</h1>
							<div className='flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono border-y border-border py-4'>
								<div className='flex items-center gap-2'>
									<div className='w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold'>
										{activePost.author.charAt(0)}
									</div>
									<span>{activePost.author}</span>
								</div>
								<div className='flex items-center gap-1.5'>
									<Calendar className='w-4 h-4 opacity-70' />
									{activePost.date}
								</div>
								<div className='flex items-center gap-1.5'>
									<Clock className='w-4 h-4 opacity-70' />
									{activePost.readTime}
								</div>
							</div>
						</header>

						<motion.article
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.05 }}
							className='prose prose-slate dark:prose-invert max-w-none
							prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[17px]
							prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
							prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
							prose-strong:text-foreground
							prose-ul:text-muted-foreground prose-li:marker:text-primary
							prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-foreground prose-blockquote:font-medium prose-blockquote:not-italic'>
							{activePost.content}
						</motion.article>

						<div className='mt-20 pt-8 border-t border-border flex justify-between items-center'>
							<p className='text-sm text-muted-foreground'>
								Cảm ơn bạn đã đọc bài viết.
							</p>
							<button
								onClick={() =>
									window.scrollTo({
										top: 0,
										behavior: 'smooth',
									})
								}
								className='text-sm font-semibold text-foreground hover:text-primary transition-colors'>
								Lên đầu trang ↑
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.main>
	)
}
