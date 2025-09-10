import { prisma } from "@/lib/prisma";
import slugify from "slugify";
import bcrypt from "bcryptjs";

async function main() {
	console.log("Seeding (Prisma) started...");

	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	await prisma.category.deleteMany();
	await prisma.user.deleteMany();

	const passwordHash = await bcrypt.hash("admin123", 10);
	const admin = await prisma.user.create({
		data: { name: "Admin", email: "admin@example.com", passwordHash, role: "admin" },
	});

	const catNames = ["Teknoloji", "Tasarim", "Gundem"];
	const categories = await Promise.all(
		catNames.map((name) =>
			prisma.category.create({ data: { name, slug: slugify(name, { lower: true, strict: true }) } })
		)
	);

	const post1 = await prisma.post.create({
		data: {
			title: "Modern Web Performans İpuçları",
			slug: "modern-web-performans-ipuclari",
			excerpt: "Next.js, caching ve lazy loading ile daha hızlı deneyimler.",
			content: "<p>Performans, kullanıcı deneyimini doğrudan etkiler...</p>",
			coverImage:
				"https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&q=80&auto=format&fit=crop",
			published: true,
			publishedAt: new Date(),
			authorId: admin.id,
			categories: { connect: [{ id: categories[0].id }] },
		},
	});

	await prisma.post.create({
		data: {
			title: "Minimal Tasarım Prensipleri",
			slug: "minimal-tasarim-prensipleri",
			excerpt: "Sadelik, okunabilirlik ve hiyerarşi üzerine notlar.",
			content: "<p>Minimal tasarımda gereksiz her şey çıkarılır...</p>",
			coverImage:
				"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
			published: true,
			publishedAt: new Date(),
			authorId: admin.id,
			categories: { connect: [{ id: categories[1].id }] },
		},
	});

	await prisma.comment.create({
		data: { postId: post1.id, name: "Ziyaretçi", email: "user@example.com", content: "Harika ipuçları!", approved: true },
	});

	console.log("Seeding finished.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
