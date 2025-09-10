"use client";
import Link from "next/link";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200/60">
			<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
				<Link href="/" className="font-semibold text-lg">Modern Blog</Link>
				<nav className="flex items-center gap-3">
					<Link href="/" className="hover:text-brand-blue">Yazılar</Link>
					<Link href="/admin" className="hover:text-brand-orange">Admin</Link>
				</nav>
			</div>
		</header>
	);
}
