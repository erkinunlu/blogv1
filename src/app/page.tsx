import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
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

async function getData(): Promise<{ posts: PostDto[]; categories: Category[]; tags: { id: number; name: string; slug: string }[] }> {
	const [posts, categories, tags] = await Promise.all([
		prisma.post.findMany({ include: { categories: true, author: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: "desc" }, take: 50 }),
		prisma.category.findMany({ orderBy: { name: "asc" } }),
		prisma.tag.findMany({ orderBy: { name: "asc" } }),
	]);
	return { posts: posts as unknown as PostDto[], categories: categories as unknown as Category[], tags };
}

export default async function Home() {
	const { posts, categories, tags } = await getData();
	return (
		<div>
			<Navbar />
			<section className="bg-gradient-to-r from-brand-pink/10 via-brand-blue/10 to-brand-teal/10 dark:from-brand-dark dark:via-brand-dark dark:to-brand-dark">
				<div className="mx-auto max-w-6xl px-4 py-14">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Modern, Renkli ve Hızlı Blog</h1>
					<p className="opacity-80 max-w-2xl">Canlı renk paleti ve kullanıcı dostu tasarımla içerikleri keşfet.</p>
				</div>
			</section>
			<main className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
				<div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 -mt-8">
					{posts.map((p) => (
						<PostCard key={p.id} post={p} />
					))}
				</div>
				<div className="lg:col-span-4 -mt-8">
					<Sidebar categories={categories} tags={tags} />
				</div>
			</main>
			<Footer />
		</div>
	);
}
