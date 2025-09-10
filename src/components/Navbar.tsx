"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return (
		<header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 border-b border-gray-200/60 dark:border-white/10">
			<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
				<Link href="/" className="font-semibold text-lg">Modern Blog</Link>
				<nav className="flex items-center gap-3">
					<Link href="/" className="hover:text-brand-blue">Yazılar</Link>
					<Link href="/admin" className="hover:text-brand-orange">Admin</Link>
					<button
						className="ml-2 rounded-md border px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						{mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
					</button>
				</nav>
			</div>
		</header>
	);
}
