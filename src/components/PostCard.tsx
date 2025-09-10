import Link from "next/link";

interface Props {
	post: any;
}

export default function PostCard({ post }: Props) {
	return (
		<article className="group border rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-white/5">
			{post.coverImage ? (
				<div className="aspect-video w-full overflow-hidden rounded-md mb-3">
					<img src={post.coverImage} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
				</div>
			) : null}
			<h3 className="text-xl font-semibold mb-1">
				<Link href={`/post/${post.slug}`} className="hover:text-brand-blue">{post.title}</Link>
			</h3>
			<p className="text-sm opacity-80 line-clamp-2">{post.excerpt}</p>
			<div className="mt-3 text-xs opacity-70 flex gap-2 flex-wrap">
				{post.categories?.map((c: any) => (
					<span key={c._id} className="rounded bg-gray-100 dark:bg-white/10 px-2 py-0.5">{c.name}</span>
				))}
			</div>
		</article>
	);
}
