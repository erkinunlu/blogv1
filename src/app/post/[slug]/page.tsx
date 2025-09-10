import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar";
import LatestStrip from "@/components/LatestStrip";

async function fetchPost(slug: string) {
	const post = await prisma.post.findUnique({
		where: { slug },
		include: { categories: true, author: { select: { name: true } } },
	});
	return post;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
	const post = await fetchPost(params.slug);
	const [categories, latest] = await Promise.all([
		prisma.category.findMany({ orderBy: { name: "asc" } }),
		prisma.post.findMany({ select: { id: true, title: true, slug: true }, orderBy: { createdAt: "desc" }, take: 6 }),
	]);
	if (!post) return <div className="mx-auto max-w-3xl px-4 py-20">Bulunamadı</div>;
	return (
		<div>
			<Navbar />
			<LatestStrip posts={latest} />
			<main className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
				<div className="lg:col-span-8">
					<h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
					<p className="opacity-70 text-sm mb-6">{new Date(post.createdAt).toLocaleDateString("tr-TR")} — {post.author?.name}</p>
					{post.coverImage ? (
						<div className="aspect-video w-full overflow-hidden rounded-md mb-6 relative">
							<Image src={post.coverImage} alt={post.title} fill className="object-cover" />
						</div>
					) : null}
					<article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
				</div>
				<div className="lg:col-span-4">
					<Sidebar categories={categories as any} />
				</div>
			</main>
			<Footer />
		</div>
	);
}
