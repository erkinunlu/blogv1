"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

type Category = { id: number; name: string; slug: string };
type Post = { id: number; title: string; slug: string };

export default function AdminPosts() {
	const { data: posts, mutate } = useSWR<Post[]>("/api/posts", (u: string) => fetcher(u).then((d) => d.posts as Post[]));
	const { data: categories } = useSWR<Category[]>("/api/categories", (u: string) => fetcher(u).then((d) => d.categories as Category[]));
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("<p>Yeni içerik</p>");
	const [categoryIds, setCategoryIds] = useState<number[]>([]);
	const [loading, setLoading] = useState(false);

	async function addPost() {
		if (!title.trim() || !content.trim()) return;
		setLoading(true);
		await fetch("/api/posts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, content, categories: categoryIds.map(String), published: true }),
		});
		setTitle("");
		setContent("<p>Yeni içerik</p>");
		setCategoryIds([]);
		setLoading(false);
		mutate();
	}

	async function deletePost(slug: string) {
		await fetch(`/api/posts/${slug}`, { method: "DELETE" });
		mutate();
	}

	function toggleCategory(id: number) {
		setCategoryIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
	}

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Yazılar</h2>
			<div className="space-y-2 mb-6">
				<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlık" className="w-full border rounded px-3 py-2" />
				<textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="HTML içerik" className="w-full border rounded px-3 py-2 h-28" />
				<div className="flex flex-wrap gap-2">
					{(categories || []).map((c) => (
						<label key={c.id} className="text-sm flex items-center gap-1">
							<input type="checkbox" checked={categoryIds.includes(c.id)} onChange={() => toggleCategory(c.id)} /> {c.name}
						</label>
					))}
				</div>
				<button onClick={addPost} disabled={loading} className="bg-brand-blue text-white px-3 py-2 rounded">Ekle</button>
			</div>
			<ul className="space-y-2">
				{(posts || []).map((p) => (
					<li key={p.id} className="flex items-center justify-between border rounded px-3 py-2">
						<span>{p.title}</span>
						<button onClick={() => deletePost(p.slug)} className="text-red-600 text-sm">Sil</button>
					</li>
				))}
			</ul>
		</div>
	);
}
