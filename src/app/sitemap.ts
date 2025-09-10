import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	return [
		{ url: `${base}/`, changeFrequency: "weekly", priority: 1 },
		{ url: `${base}/admin`, changeFrequency: "monthly", priority: 0.3 },
	];
}
