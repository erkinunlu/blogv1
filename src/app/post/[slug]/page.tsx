import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function fetchPost(slug: string) {
	const post = await prisma.post.findUnique({
		where: { slug },
		include: { categories: true, author: { select: { name: true } } },
	});
	return post;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
	const post = await fetchPost(params.slug);
	if (!post) return <div className="mx-auto max-w-3xl px-4 py-20">Bulunamadı</div>;
	return (
		<div>
			<Navbar />
			<main className="mx-auto max-w-3xl px-4 py-10">
				<h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
				<p className="opacity-70 text-sm mb-6">{new Date(post.createdAt).toLocaleDateString("tr-TR")} — {post.author?.name}</p>
				{post.coverImage ? (
					<div className="aspect-video w-full overflow-hidden rounded-md mb-6 relative">
						<Image src={post.coverImage} alt={post.title} fill className="object-cover" />
					</div>
				) : null}
				<article className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
			</main>
			<Footer />
		</div>
	);
}
