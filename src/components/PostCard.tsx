import Link from "next/link";
import Image from "next/image";
import type { PostDto } from "@/app/page";

interface Props {
	post: PostDto;
}

export default function PostCard({ post }: Props) {
	return (
		<article className="group border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
			{post.coverImage ? (
				<div className="aspect-video w-full overflow-hidden rounded-md mb-3 relative">
					<Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform" />
				</div>
			) : null}
			<h3 className="text-xl font-semibold mb-1">
				<Link href={`/post/${post.slug}`} className="hover:text-brand-blue">{post.title}</Link>
			</h3>
			<p className="text-sm opacity-80 line-clamp-2">{post.excerpt}</p>
			<div className="mt-3 text-xs opacity-70 flex gap-2 flex-wrap">
				{post.categories?.map((c) => (
					<span key={c.id} className="rounded bg-gray-100 px-2 py-0.5">{c.name}</span>
				))}
			</div>
		</article>
	);
}
