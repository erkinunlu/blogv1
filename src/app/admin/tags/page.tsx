"use client";
import useSWR from "swr";
import { useState } from "react";

type Tag = { id: number; name: string; slug: string };
const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function AdminTags() {
	const { data, mutate } = useSWR<Tag[]>("/api/tags", (u: string) => fetcher(u).then((d) => d.tags as Tag[]));
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	async function addTag() {
		if (!name.trim()) return;
		setLoading(true);
		await fetch("/api/tags", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
		setName("");
		setLoading(false);
		mutate();
	}

	async function deleteTag(slug: string) {
		await fetch(`/api/tags/${slug}`, { method: "DELETE" });
		mutate();
	}

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Etiketler</h2>
			<div className="flex gap-2 mb-4">
				<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Etiket adı" className="border rounded px-3 py-2" />
				<button onClick={addTag} disabled={loading} className="bg-brand-blue text-white px-3 py-2 rounded">Ekle</button>
			</div>
			<ul className="space-y-2">
				{(data || []).map((t) => (
					<li key={t.id} className="flex items-center justify-between border rounded px-3 py-2">
						<span>#{t.name}</span>
						<button onClick={() => deleteTag(t.slug)} className="text-red-600 text-sm">Sil</button>
					</li>
				))}
			</ul>
		</div>
	);
}
