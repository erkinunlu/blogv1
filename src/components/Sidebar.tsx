import Link from "next/link";

export default function Sidebar({ categories = [], tags = [] as { id: number; name: string; slug: string }[] }: { categories?: { id: number; name: string; slug: string }[]; tags?: { id: number; name: string; slug: string }[] }) {
	return (
		<aside className="space-y-6">
			<section className="border rounded-lg p-4 bg-white">
				<h3 className="font-semibold text-brand-violet mb-2">Hakkımda</h3>
				<p className="text-sm opacity-80">Merhaba! Modern web teknolojileri ile içerik üretmeyi seviyorum. Bu blogda performans, tasarım ve üretkenlik üzerine yazıyorum.</p>
			</section>
			<section className="border rounded-lg p-4 bg-white">
				<h3 className="font-semibold text-brand-teal mb-2">Kategoriler</h3>
				<div className="flex flex-wrap gap-2">
					{categories.map((c) => (
						<Link key={c.id} href={`/?category=${c.slug}`} className="text-sm px-2 py-1 rounded bg-brand-light hover:bg-brand-pink/10">
							{c.name}
						</Link>
					))}
				</div>
			</section>
			<section className="border rounded-lg p-4 bg-white">
				<h3 className="font-semibold text-brand-orange mb-2">Etiketler</h3>
				<div className="flex flex-wrap gap-2">
					{(tags.length ? tags : [{ id: 1, name: "nextjs", slug: "nextjs" }, { id: 2, name: "react", slug: "react" }, { id: 3, name: "tasarim", slug: "tasarim" }]).map((t) => (
						<Link key={t.id} href={`/?tag=${t.slug}`} className="text-xs px-2 py-1 rounded border border-brand-pink/30 text-brand-pink">#{t.name}</Link>
					))}
				</div>
			</section>
		</aside>
	);
}
