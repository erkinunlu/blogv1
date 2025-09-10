import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Modern Blog",
	description: "Modern, hızlı ve SEO dostu blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="tr">
			<body className={`${inter.className} bg-brand-light text-gray-900`}>
				{children}
			</body>
		</html>
	);
}
