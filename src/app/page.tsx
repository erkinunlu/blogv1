import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { prisma } from "@/lib/prisma";

interface Category { id: number; name: string; slug: string }
interface Author { id: number; name: string; email: string }
export interface PostDto {
	id: number;
	title: string;
	slug: string;
	excerpt?: string;
	coverImage?: string;
	categories: Category[];
	author?: Author;
	createdAt: string;
}

async function getPosts(): Promise<PostDto[]> {
	const posts = await prisma.post.findMany({
		include: { categories: true, author: { select: { id: true, name: true, email: true } } },
		orderBy: { createdAt: "desc" },
		take: 50,
	});
	return posts as unknown as PostDto[];
}

export default async function Home() {
	const posts = await getPosts();
	return (
		<div>
			<Navbar />
			<section className="bg-gradient-to-b from-brand-light to-white dark:from-brand-dark dark:to-black">
				<div className="mx-auto max-w-6xl px-4 py-14">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Modern, Minimal ve Hızlı Blog</h1>
					<p className="opacity-80 max-w-2xl">Özenle seçilmiş yazılar, sade tasarım ve yüksek performans. Kategorilere göre keşfet, arama ile hızla bul.</p>
				</div>
			</section>
			<main className="mx-auto max-w-6xl px-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 -mt-8">
					{posts.map((p) => (
						<PostCard key={p.id} post={p} />
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
}
