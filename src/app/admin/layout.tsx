export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			<h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
			{children}
		</div>
	);
}
