import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mt-12 bg-gradient-to-r from-brand-blue/10 via-brand-pink/10 to-brand-teal/10 dark:from-white/5 dark:via-white/5 dark:to-white/5">
			<div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
				<div>
					<h4 className="font-semibold mb-3">Modern Blog</h4>
					<p className="text-sm opacity-80">Minimal, hızlı ve modern deneyim. İçerikleri takipte kalın.</p>
				</div>
				<div>
					<h5 className="font-semibold mb-3">Keşfet</h5>
					<ul className="space-y-2 text-sm opacity-90">
						<li><Link href="/" className="hover:text-brand-blue">Anasayfa</Link></li>
						<li><Link href="/admin" className="hover:text-brand-blue">Admin</Link></li>
						<li><Link href="/" className="hover:text-brand-blue">Son Yazılar</Link></li>
					</ul>
				</div>
				<div>
					<h5 className="font-semibold mb-3">Sosyal</h5>
					<div className="flex gap-4 text-sm opacity-90">
						<a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue">Twitter</a>
						<a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue">GitHub</a>
						<a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue">Instagram</a>
					</div>
				</div>
			</div>
			<div className="border-t border-white/20">
				<div className="mx-auto max-w-6xl px-4 py-4 text-xs opacity-70">© {new Date().getFullYear()} Modern Blog</div>
			</div>
		</footer>
	);
}
