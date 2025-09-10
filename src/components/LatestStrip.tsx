import Link from "next/link";

export default function LatestStrip({ posts }: { posts: { id: number; title: string; slug: string }[] }) {
	if (!posts?.length) return null;
	return (
		<div className="border-y bg-white/70 backdrop-blur dark:bg-white/10">
			<div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
				{posts.slice(0, 6).map((p) => (
					<Link key={p.id} href={`/post/${p.slug}`} className="text-sm hover:text-brand-blue line-clamp-2">
						{p.title}
					</Link>
				))}
			</div>
		</div>
	);
}
