export type Lang = 'vi' | 'en'

interface MessageTree {
	[key: string]: string | MessageTree
}

export const defaultLang: Lang = 'vi'

export const messages: Record<Lang, MessageTree> = {
	vi: {
		brand: 'HNDB',
		nav: {
			features: 'Tính năng',
			customization: 'Tùy chỉnh',
			demo: 'Giao diện',
			download: 'Tải app',
			blog: 'Blog',
			enter: 'Đăng nhập',
		},
		hero: {
			badge: 'HNDB • MODERN RDBMS CLIENT',
			title: 'Desktop SQL Client tối giản. Tập trung vào trải nghiệm của bạn.',
			description:
				'Không cồng kềnh, không tính năng thừa. HNDB mang lại trải nghiệm truy vấn cơ sở dữ liệu siêu tốc với giao diện gọn gàng và khả năng tùy biến thông số sâu sắc.',
			login: 'Đăng nhập / Đăng ký',
			noLoginDemo: 'Xem giao diện demo',
		},
		authCard: {
			title: 'Đồng bộ cấu hình',
			description:
				'Đăng nhập để đồng bộ các thiết lập tùy chỉnh và query history của bạn qua Cloud, hoặc sử dụng offline ngay lập tức.',
			enter: 'Tới trang Đăng nhập',
			skip: 'Dùng thử không cần tài khoản',
		},
		stats: {
			firstLabel: '< 50ms',
			firstText:
				'Độ trễ phản hồi giao diện, đảm bảo trải nghiệm gõ code mượt mà',
			secondLabel: '100%',
			secondText:
				'Quyền kiểm soát thuộc về bạn với hàng tá thông số tùy chỉnh',
			thirdLabel: 'Native',
			thirdText:
				'Tối ưu hóa tài nguyên phần cứng, không ngốn RAM như Electron',
		},
		features: {
			title1: 'Giao diện tối giản',
			text1: 'Bỏ đi các thanh menu rườm rà. Chỉ hiển thị những gì bạn thực sự cần để tập trung vào việc viết Query.',
			title2: 'Khả năng tùy chỉnh sâu',
			text2: 'Từ Editor, Theme, Keybindings cho đến Fetch Size và Connection Timeout, mọi thứ đều có thể tinh chỉnh.',
			title3: 'Trình quản lý kết nối thông minh',
			text3: 'Quản lý nhiều RDBMS dễ dàng, hỗ trợ kết nối qua SSH Tunnel và SSL với cấu hình chi tiết.',
		},
		customization: {
			badge: 'TÙY BIẾN KHÔNG GIỚI HẠN',
			title: 'Kiểm soát mọi thông số',
			description:
				'HNDB được thiết kế để phục vụ thói quen của riêng bạn, chứ không bắt bạn phải làm quen với nó.',
			item1Title: 'SQL Editor',
			item1Text:
				'Tùy chỉnh Font chữ, Ligatures, Auto-completion, và Snippets cá nhân hóa.',
			item2Title: 'Data Grid',
			item2Text:
				'Thiết lập định dạng hiển thị cho từng kiểu dữ liệu, giới hạn số dòng (Limit/Offset) mặc định.',
			item3Title: 'Themes & Layout',
			item3Text:
				'Chuyển đổi linh hoạt giữa Light/Dark mode, tùy chỉnh màu sắc syntax và vị trí các panel.',
			item4Title: 'Advanced Parameters',
			item4Text:
				'Can thiệp sâu vào Driver Properties, Transaction isolation level và Keep-alive interval.',
		},
		demo: {
			badge: 'GIAO DIỆN THỰC TẾ',
			title: 'Đẹp mắt và Dễ nhìn',
			description:
				'Thiết kế chuẩn mực giúp mắt bạn không bị mỏi khi phải làm việc với dữ liệu trong nhiều giờ liền.',
		},
		download: {
			title: 'Trải nghiệm HNDB ngay hôm nay',
			description:
				'Nhẹ, nhanh và cài đặt chỉ trong vài giây. Chọn phiên bản phù hợp với hệ điều hành của bạn.',
			recommended: 'Khuyên dùng cho thiết bị của bạn',
			latest: 'Xem tất cả phiên bản',
			windows: 'Windows',
			macos: 'macOS',
			linux: 'Linux',
			windowsNote: 'Bản cài đặt .msi (x64 / ARM64)',
			macosNote: 'Bản cài đặt .dmg (Apple Silicon & Intel)',
			linuxNote: 'AppImage / .deb / .rpm',
			autoCta:
				'Đã tự động chọn phiên bản phù hợp nhất với máy tính của bạn.',
			autoFallback: 'Tải bản mới nhất',
			viewInstallers: 'Tùy chọn tải xuống khác',
			downloadNow: 'Tải ngay',
		},
		footer: {
			tagline:
				'A fast, highly customizable database client for modern developers.',
			help: 'Tài liệu hướng dẫn',
			support: 'Báo lỗi & Góp ý',
			contact: 'Liên hệ',
			legal: 'Quyền riêng tư',
			rights: 'All rights reserved.',
		},
		enter: {
			back: 'Về trang chủ',
			title: 'Đăng nhập & Đồng bộ',
			description:
				'Đồng bộ an toàn các cấu hình kết nối, snippets và lịch sử truy vấn của bạn qua Cloud, hoặc sử dụng offline hoàn toàn không cần tài khoản.',
			demo: 'Dùng thử ngay',
			onboard: 'Tài liệu API & Cài đặt',
			email: 'Địa chỉ Email',
			password: 'Mật khẩu',
			signIn: 'Đăng nhập',
			signUp: 'Tạo tài khoản',
			logout: 'Đăng xuất',
			signInGoogle: 'Tiếp tục với Google',
			signInGithub: 'Tiếp tục với GitHub',
			or: 'Hoặc',
			session: 'Đang đăng nhập với',
			successSignUp:
				'Đăng ký thành công. Hãy kiểm tra email để xác minh.',
			envMissing:
				'Thiếu cấu hình Supabase. Vui lòng kiểm tra các biến môi trường.',
		},
		social: {
			sponsors: 'ĐƯỢC HỖ TRỢ BỞI CÁC QUỸ HÀNG ĐẦU',
			customers: 'Tin dùng bởi các engineering team tại',
			reviewsBadge: 'WALL OF LOVE',
			reviewsTitle: 'Cộng đồng nói gì về HNDB?',
			reviewsDescription:
				'Đừng chỉ nghe từ chúng tôi. Hãy xem các lập trình viên khác đánh giá thế nào sau khi chuyển sang sử dụng HNDB.',
			review1Text:
				'"Chuyển từ DataGrip sang HNDB là quyết định đúng đắn nhất năm nay của tôi. Nó nhẹ gọn hơn rất nhiều và tốc độ query thì không phải bàn cãi."',
			review1Name: 'Nguyễn Văn A',
			review1Title: 'Senior Backend Engineer',
			review2Text:
				'"Cuối cùng cũng có một SQL Client hiểu ý Developer. Tôi thích cách HNDB cho phép tùy biến mọi thứ bằng phím tắt."',
			review2Name: 'Trần B',
			review2Title: 'Database Administrator',
			review3Text:
				'"Không Electron, không ngốn RAM. Chạy hàng triệu rows mà app vẫn mượt mà. Đội ngũ phát triển đã làm việc rất tuyệt vời!"',
			review3Name: 'Lê Hoàng C',
			review3Title: 'CTO @ TechFlow',
		},
	},
	en: {
		brand: 'HNDB',
		enter: {
			back: 'Back to Home',
			title: 'Sign In & Sync',
			description:
				'Securely sync your connection profiles, snippets, and query history across devices, or stay completely offline without an account.',
			demo: 'Try it now',
			onboard: 'API & Setup Docs',
			email: 'Email address',
			password: 'Password',
			signIn: 'Sign In',
			signUp: 'Create account',
			logout: 'Sign Out',
			signInGoogle: 'Continue with Google',
			signInGithub: 'Continue with GitHub',
			or: 'Or',
			session: 'Signed in as',
			successSignUp: 'Sign-up successful. Please verify your email.',
			envMissing:
				'Missing Supabase configuration. Please check your environment variables.',
		},
		nav: {
			features: 'Features',
			customization: 'Customization',
			demo: 'Interface',
			download: 'Download',
			blog: 'Blog',
			enter: 'Sign In',
		},
		hero: {
			badge: 'HNDB • MODERN RDBMS CLIENT',
			title: 'A minimalist SQL Client. Built for your workflow.',
			description:
				'No bloat, no unnecessary features. HNDB delivers a lightning-fast database querying experience with a clean UI and deep parameter customizability.',
			login: 'Sign in / Sign up',
			noLoginDemo: 'View interface demo',
		},
		authCard: {
			title: 'Sync your setup',
			description:
				'Sign in to sync your custom configurations and query history across devices, or start using it offline instantly.',
			enter: 'Go to Sign In',
			skip: 'Try without an account',
		},
		stats: {
			firstLabel: '< 50ms',
			firstText:
				'UI response latency, ensuring a buttery smooth typing experience.',
			secondLabel: '100%',
			secondText:
				'Control is in your hands with dozens of customizable parameters.',
			thirdLabel: 'Native',
			thirdText:
				'Hardware resource optimized. Say goodbye to memory-hungry clients.',
		},
		features: {
			title1: 'Minimalist Interface',
			text1: 'Stripped away the clunky menus. We only show what you truly need so you can focus on writing queries.',
			title2: 'Deep Customizability',
			text2: 'From the Editor, Themes, and Keybindings to Fetch Size and Connection Timeouts, everything is tweakable.',
			title3: 'Smart Connection Manager',
			text3: 'Manage multiple RDBMS effortlessly, with full support for SSH Tunnels and detailed SSL configurations.',
		},
		customization: {
			badge: 'LIMITLESS TWEAKS',
			title: 'Take control of every parameter',
			description:
				'HNDB is designed to adapt to your specific habits, rather than forcing you to adapt to it.',
			item1Title: 'SQL Editor',
			item1Text:
				'Customize Fonts, Ligatures, Auto-completion behavior, and personal Snippets.',
			item2Title: 'Data Grid',
			item2Text:
				'Set display formats for specific data types and configure default Limit/Offset behaviors.',
			item3Title: 'Themes & Layout',
			item3Text:
				'Switch seamlessly between modes, tweak syntax highlighting colors, and adjust panel placements.',
			item4Title: 'Advanced Parameters',
			item4Text:
				'Deep dive into Driver Properties, Transaction isolation levels, and Keep-alive intervals.',
		},
		demo: {
			badge: 'ACTUAL FOOTAGE',
			title: 'Clean and Easy on the Eyes',
			description:
				'A standard-setting design that reduces eye strain when staring at data arrays for hours on end.',
		},
		download: {
			title: 'Experience HNDB today',
			description:
				'Lightweight, fast, and installs in seconds. Select the version tailored for your OS.',
			recommended: 'Recommended for your device',
			latest: 'View all releases',
			windows: 'Windows',
			macos: 'macOS',
			linux: 'Linux',
			windowsNote: '.msi installer (x64 / ARM64)',
			macosNote: '.dmg installer (Apple Silicon & Intel)',
			linuxNote: 'AppImage / .deb / .rpm',
			autoCta:
				'Automatically selected the best version for your current system.',
			autoFallback: 'Download latest release',
			viewInstallers: 'Other download options',
			downloadNow: 'Download now',
		},
		footer: {
			tagline:
				'A fast, highly customizable database client for modern developers.',
			help: 'Documentation',
			support: 'Report an Issue',
			contact: 'Contact Us',
			legal: 'Privacy Policy',
			rights: 'All rights reserved.',
		},

		social: {
			sponsors: 'BACKED BY TOP TIER INVESTORS',
			customers: 'Trusted by engineering teams at',
			reviewsBadge: 'WALL OF LOVE',
			reviewsTitle: 'What developers are saying',
			reviewsDescription:
				"Don't just take our word for it. See how other engineers feel after switching to HNDB.",
			review1Text:
				'"Switching from DataGrip to HNDB was the best decision I made this year. It\'s incredibly lightweight and the query speed is unmatched."',
			review1Name: 'Alex Nguyen',
			review1Title: 'Senior Backend Engineer',
			review2Text:
				'"Finally, an SQL Client that gets it. I absolutely love how HNDB is fully keyboard-driven and highly customizable."',
			review2Name: 'Brian T.',
			review2Title: 'Database Administrator',
			review3Text:
				'"No Electron, no memory leaks. I can fetch millions of rows and the app stays buttery smooth. Incredible work by the team!"',
			review3Name: 'Chris L.',
			review3Title: 'CTO @ TechFlow',
		},
	},
}

export function normalizeLang(value: string | null | undefined): Lang {
	return value === 'en' ? 'en' : 'vi'
}

export function getMessage(lang: Lang, path: string): string {
	const parts = path.split('.')
	let current: string | MessageTree | undefined = messages[lang]

	for (const key of parts) {
		if (typeof current !== 'object' || current === null) {
			return path
		}
		current = current[key]
	}

	return typeof current === 'string' ? current : path
}
