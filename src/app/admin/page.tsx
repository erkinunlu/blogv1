"use client";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminHome() {
	const { data: posts } = useSWR("/api/posts", (u) => fetcher(u).then((d) => d.posts));
	const { data: categories } = useSWR("/api/categories", (u) => fetcher(u).then((d) => d.categories));
	const { data: comments } = useSWR("/api/comments", (u) => fetcher(u).then((d) => d.comments));
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="border rounded-md p-4">
				<h3 className="font-semibold mb-2">Yazılar</h3>
				<p className="text-3xl">{posts?.length ?? 0}</p>
				<Link href="/admin/posts" className="text-brand-blue text-sm mt-2 inline-block">Yönet</Link>
			</div>
			<div className="border rounded-md p-4">
				<h3 className="font-semibold mb-2">Kategoriler</h3>
				<p className="text-3xl">{categories?.length ?? 0}</p>
				<Link href="/admin/categories" className="text-brand-blue text-sm mt-2 inline-block">Yönet</Link>
			</div>
			<div className="border rounded-md p-4">
				<h3 className="font-semibold mb-2">Yorumlar</h3>
				<p className="text-3xl">{comments?.length ?? 0}</p>
				<Link href="/admin/comments" className="text-brand-blue text-sm mt-2 inline-block">Yönet</Link>
			</div>
		</div>
	);
}
