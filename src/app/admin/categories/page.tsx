"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

type Category = { id: number; name: string; slug: string };

export default function AdminCategories() {
	const { data: categories, mutate } = useSWR<Category[]>("/api/categories", (u: string) => fetcher(u).then((d) => d.categories as Category[]));
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	async function addCategory() {
		if (!name.trim()) return;
		setLoading(true);
		await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
		setName("");
		setLoading(false);
		mutate();
	}

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
			<div className="flex gap-2 mb-4">
				<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Kategori adı" className="border rounded px-3 py-2" />
				<button onClick={addCategory} disabled={loading} className="bg-brand-blue text-white px-3 py-2 rounded">Ekle</button>
			</div>
			<ul className="space-y-2">
				{(categories || []).map((c) => (
					<li key={c.id} className="flex items-center justify-between border rounded px-3 py-2">
						<span>{c.name}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
