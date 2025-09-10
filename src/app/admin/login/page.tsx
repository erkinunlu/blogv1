"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError("");
		const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
		setLoading(false);
		if (!res.ok) {
			const j = await res.json().catch(() => ({}));
			setError(j.message || "Giriş başarısız");
			return;
		}
		router.push("/admin");
	}

	return (
		<div className="max-w-sm mx-auto">
			<h2 className="text-xl font-semibold mb-4">Admin Girişi</h2>
			<form onSubmit={onSubmit} className="space-y-3">
				<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-posta" className="w-full border rounded-md px-3 py-2" />
				<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Şifre" className="w-full border rounded-md px-3 py-2" />
				<button disabled={loading} className="w-full bg-brand-blue text-white rounded-md px-3 py-2 hover:opacity-90">
					{loading ? "Giriş yapılıyor..." : "Giriş Yap"}
				</button>
				{error && <p className="text-red-600 text-sm">{error}</p>}
			</form>
		</div>
	);
}
