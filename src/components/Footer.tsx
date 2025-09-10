export default function Footer() {
	return (
		<footer className="border-t border-gray-200/60 dark:border-white/10 mt-12">
			<div className="mx-auto max-w-6xl px-4 py-8 text-sm flex items-center justify-between">
				<p className="opacity-70">© {new Date().getFullYear()} Modern Blog</p>
				<div className="flex items-center gap-4 opacity-80">
					<a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue">Twitter</a>
					<a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue">GitHub</a>
					<a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue">Instagram</a>
				</div>
			</div>
		</footer>
	);
}
