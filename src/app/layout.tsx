import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Modern Blog",
	description: "Modern, hızlı ve SEO dostu blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="tr" suppressHydrationWarning>
			<body className={`${inter.className} bg-white text-gray-900 dark:bg-brand-dark dark:text-gray-100`}> 
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
