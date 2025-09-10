import "dotenv/config";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { Category } from "@/models/Category";
import { Post } from "@/models/Post";
import { Comment } from "@/models/Comment";
import { hashPassword } from "@/lib/auth";

async function main() {
	await connectToDatabase();
	console.log("Seeding started...");

	await Promise.all([Post.deleteMany({}), Category.deleteMany({}), User.deleteMany({}), Comment.deleteMany({})]);

	const adminPassword = await hashPassword("admin123");
	const admin = await User.create({ name: "Admin", email: "admin@example.com", passwordHash: adminPassword, role: "admin" });

	const cats = await Category.insertMany([
		{ name: "Teknoloji", slug: "teknoloji" },
		{ name: "Tasarim", slug: "tasarim" },
		{ name: "Gundem", slug: "gundem" },
	]);

	const posts = await Post.insertMany([
		{
			title: "Modern Web Performans İpuçları",
			slug: "modern-web-performans-ipuclari",
			excerpt: "Next.js, caching ve lazy loading ile daha hızlı deneyimler.",
			content: "<p>Performans, kullanıcı deneyimini doğrudan etkiler...</p>",
			coverImage: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&q=80&auto=format&fit=crop",
			published: true,
			categories: [cats[0]._id],
			author: admin._id,
			publishedAt: new Date(),
		},
		{
			title: "Minimal Tasarım Prensipleri",
			slug: "minimal-tasarim-prensipleri",
			excerpt: "Sadelik, okunabilirlik ve hiyerarşi üzerine notlar.",
			content: "<p>Minimal tasarımda gereksiz her şey çıkarılır...</p>",
			coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
			published: true,
			categories: [cats[1]._id],
			author: admin._id,
			publishedAt: new Date(),
		},
	]);

	await Comment.create({ post: posts[0]._id, name: "Ziyaretçi", email: "user@example.com", content: "Harika ipuçları!", approved: true });

	console.log("Seeding finished.");
	process.exit(0);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
