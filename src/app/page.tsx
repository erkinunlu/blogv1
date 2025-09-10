import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";

async function fetchPosts(q?: string, category?: string) {
	const params = new URLSearchParams();
	if (q) params.set("q", q);
	if (category) params.set("category", category);
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?${params.toString()}`, { next: { revalidate: 60 } });
	const data = await res.json();
	return data.posts || [];
}

export default async function Home() {
	const posts = await fetchPosts();
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
					{posts.map((p: any) => (
						<PostCard key={p._id} post={p} />
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
}
