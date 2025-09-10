"use client";
import useSWR from "swr";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

type Comment = { id: number; name: string; email: string; content: string; approved: boolean };

export default function AdminComments() {
	const { data: comments, mutate } = useSWR<Comment[]>("/api/comments", (u) => fetcher(u).then((d) => d.comments as Comment[]));

	async function approve(id: number) {
		await fetch(`/api/comments/${id}`, { method: "PATCH" });
		mutate();
	}
	async function remove(id: number) {
		await fetch(`/api/comments/${id}`, { method: "DELETE" });
		mutate();
	}

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Yorumlar</h2>
			<ul className="space-y-2">
				{(comments || []).map((c) => (
					<li key={c.id} className="border rounded p-3 flex items-center justify-between">
						<div>
							<p className="font-medium">{c.name} <span className="opacity-70 text-xs">({c.email})</span></p>
							<p className="text-sm opacity-90">{c.content}</p>
						</div>
						<div className="flex gap-2">
							{!c.approved && (
								<button onClick={() => approve(c.id)} className="text-brand-teal text-sm">Onayla</button>
							)}
							<button onClick={() => remove(c.id)} className="text-red-600 text-sm">Sil</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
